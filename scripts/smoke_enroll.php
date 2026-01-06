<?php
$u = \App\Models\User::first();
$c = \App\Models\Course::where('status', 'published')->first();
if ($u && $c) {
    \App\Models\CourseEnrollment::create([
        'user_id' => $u->id,
        'course_id' => $c->id,
        'status' => 'not_started'
    ]);
    echo "ENROLLED\n";
} else {
    echo "NO_USER_OR_COURSE\n";
}
