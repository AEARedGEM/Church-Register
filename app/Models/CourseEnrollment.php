<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;
use Carbon\Carbon;

class CourseEnrollment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'course_id',
        'enrolled_at',
        'started_at',
        'completed_at',
        'progress_percentage',
        'status',
        'certificate_issued_at',
        'progress_data',
        'certificate_path',
        'progress_data'
    ];

    protected $casts = [
        'enrolled_at' => 'datetime',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
        'certificate_issued_at' => 'datetime',
        'progress_percentage' => 'integer',
        'progress_data' => 'array',
    ];

    // Constants
    const STATUSES = ['not_started', 'in_progress', 'completed', 'dropped'];

    const STATUS_NOT_STARTED = 'not_started';
    const STATUS_IN_PROGRESS = 'in_progress';
    const STATUS_COMPLETED = 'completed';
    const STATUS_DROPPED = 'dropped';

    protected static function boot()
    {
        parent::boot();

        // Set enrolled_at timestamp when creating
        static::creating(function ($enrollment) {
            if (!$enrollment->enrolled_at) {
                $enrollment->enrolled_at = now();
            }
        });
        static::updated(function ($enrollment) {
            if ($enrollment->status === 'completed' &&
                !$enrollment->certificate_issued_at &&
                $enrollment->course->offers_certificate) {
                $enrollment->issueCertificate();
            }
        });

        // Handle enrollment count updates
        static::created(function ($enrollment) {
            $enrollment->course->incrementEnrollmentCount();
        });

        static::deleted(function ($enrollment) {
            $enrollment->course->decrementEnrollmentCount();
        });
    }

    // Relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    // Scopes
    public function scopeByStatus(Builder $query, string $status): Builder
    {
        return $query->where('status', $status);
    }

    public function scopeNotStarted(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_NOT_STARTED);
    }

    public function scopeInProgress(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_IN_PROGRESS);
    }

    public function scopeCompleted(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_COMPLETED);
    }

    public function scopeDropped(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_DROPPED);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->whereIn('status', [self::STATUS_NOT_STARTED, self::STATUS_IN_PROGRESS]);
    }

    // public function scopeByUser(Builder $query, int $userId): Builder
    // {
    //     return $query->where('user_id', $userId);
    // }

    public function scopeByUser(Builder $query, ?int $userId): Builder
    {
        if ($userId === null) {
            // Option 1: Return an empty query (no results)
            return $query->whereRaw('1 = 0');
            // Option 2: Throw an exception
            // throw new \InvalidArgumentException('User ID cannot be null');
        }
        return $query->where('user_id', $userId);
    }

    public function scopeByCourse(Builder $query, int $courseId): Builder
    {
        return $query->where('course_id', $courseId);
    }

    public function scopeWithCertificate(Builder $query): Builder
    {
        return $query->whereNotNull('certificate_issued_at');
    }

    public function scopeRecentlyEnrolled(Builder $query, int $days = 30): Builder
    {
        return $query->where('enrolled_at', '>=', now()->subDays($days));
    }

    // Accessors
    public function getIsCompletedAttribute(): bool
    {
        return $this->status === self::STATUS_COMPLETED;
    }

    public function getIsInProgressAttribute(): bool
    {
        return $this->status === self::STATUS_IN_PROGRESS;
    }

    public function getIsNotStartedAttribute(): bool
    {
        return $this->status === self::STATUS_NOT_STARTED;
    }

    public function getIsDroppedAttribute(): bool
    {
        return $this->status === self::STATUS_DROPPED;
    }

    public function getIsActiveAttribute(): bool
    {
        return in_array($this->status, [self::STATUS_NOT_STARTED, self::STATUS_IN_PROGRESS]);
    }

    public function getHasCertificateAttribute(): bool
    {
        return $this->certificate_issued_at !== null;
    }

    public function getTimeSpentAttribute(): ?int
    {
        if (!$this->started_at) {
            return null;
        }

        $endTime = $this->completed_at ?? now();
        return $this->started_at->diffInMinutes($endTime);
    }

    public function getDaysEnrolledAttribute(): int
    {
        return $this->enrolled_at->diffInDays(now());
    }

    public function getDaysToCompleteAttribute(): ?int
    {
        if (!$this->completed_at || !$this->started_at) {
            return null;
        }

        return $this->started_at->diffInDays($this->completed_at);
    }

    // Methods
    public function start(): bool
    {
        if ($this->status !== self::STATUS_NOT_STARTED) {
            return false;
        }

        $this->update([
            'status' => self::STATUS_IN_PROGRESS,
            'started_at' => now()
        ]);

        return true;
    }

    public function complete(): bool
    {
        if (!in_array($this->status, [self::STATUS_NOT_STARTED, self::STATUS_IN_PROGRESS])) {
            return false;
        }

        $this->update([
            'status' => self::STATUS_COMPLETED,
            'completed_at' => now(),
            'progress_percentage' => 100
        ]);

        // Issue certificate if course offers one
        if ($this->course->offers_certificate && !$this->has_certificate) {
            $this->issueCertificate();
        }

        return true;
    }

    public function drop(): bool
    {
        if (!in_array($this->status, [self::STATUS_NOT_STARTED, self::STATUS_IN_PROGRESS])) {
            return false;
        }

        $this->update([
            'status' => self::STATUS_DROPPED
        ]);

        return true;
    }

    public function updateProgress(int $percentage, array $progressData = null): bool
    {
        if ($percentage < 0 || $percentage > 100) {
            return false;
        }

        $updates = ['progress_percentage' => $percentage];

        // Start the course if not started and progress > 0
        if ($this->status === self::STATUS_NOT_STARTED && $percentage > 0) {
            $updates['status'] = self::STATUS_IN_PROGRESS;
            $updates['started_at'] = now();
        }

        // Complete if progress reaches 100%
        if ($percentage === 100 && $this->status === self::STATUS_IN_PROGRESS) {
            $updates['status'] = self::STATUS_COMPLETED;
            $updates['completed_at'] = now();
        }

        // Update progress data if provided
        if ($progressData !== null) {
            $updates['progress_data'] = array_merge($this->progress_data ?? [], $progressData);
        }

        $this->update($updates);

        // Issue certificate if completed and course offers one
        if ($percentage === 100 && $this->course->offers_certificate && !$this->has_certificate) {
            $this->issueCertificate();
        }

        return true;
    }

    public function issueCertificate(): bool
    {
        if (!$this->is_completed || $this->has_certificate) {
            return false;
        }

        // Here you would implement certificate generation logic
        // For now, just mark as issued
        $this->update([
            'certificate_issued_at' => now(),
            'certificate_path' => "certificates/{$this->user_id}_{$this->course_id}_" . now()->timestamp . ".pdf"
        ]);

        return true;
    }

    public function canRestart(): bool
    {
        return $this->status === self::STATUS_DROPPED;
    }

    public function restart(): bool
    {
        if (!$this->canRestart()) {
            return false;
        }

        $this->update([
            'status' => self::STATUS_NOT_STARTED,
            'progress_percentage' => 0,
            'started_at' => null,
            'completed_at' => null,
            'progress_data' => null
        ]);

        return true;
    }
}
