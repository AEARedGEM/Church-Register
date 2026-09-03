<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\MemberProfile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProfilePhotoFeatureTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_requires_a_profile_photo(): void
    {
        $this->from('/register')
            ->post('/register', [
                'name' => 'Photo Required',
                'email' => 'photo-required@example.com',
                'membership_status' => '2',
                'password' => 'Password123!',
                'password_confirmation' => 'Password123!',
            ])
            ->assertSessionHasErrors('profile_photo');

        $this->assertDatabaseMissing('users', ['email' => 'photo-required@example.com']);
    }

    public function test_registration_stores_the_required_profile_photo(): void
    {
        Storage::fake('local');

        $this->post('/register', [
            'name' => 'Photo Member',
            'email' => 'photo-member@example.com',
            'membership_status' => '2',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'profile_photo' => UploadedFile::fake()->image('member.png'),
        ])->assertRedirect('/dashboard');

        $user = User::query()->where('email', 'photo-member@example.com')->firstOrFail();
        $path = $user->memberProfile->avatar_path;

        $this->assertNotEmpty($path);
        $this->assertTrue(Storage::disk('local')->exists($path));
    }

    public function test_existing_member_can_upload_a_profile_photo(): void
    {
        Storage::fake('local');
        /** @var User $user */
        $user = User::factory()->create();
        $user->memberProfile()->create([
            'first_name' => 'Existing',
            'last_name' => 'Member',
            'membership_status' => 'member',
            'is_active' => true,
        ]);

        $this->actingAs($user)
            ->patch('/profile', [
                'name' => $user->name,
                'email' => $user->email,
                'profile_photo' => UploadedFile::fake()->image('profile.webp'),
            ])
            ->assertRedirect('/profile');

        $path = $user->memberProfile->fresh()->avatar_path;
        $this->assertNotEmpty($path);
        $this->assertTrue(Storage::disk('local')->exists($path));
    }

    public function test_member_photo_endpoint_allows_owner_and_admin_but_denies_other_members(): void
    {
        Storage::fake('local');
        /** @var User $owner */
        $owner = User::factory()->create();
        $profile = $owner->memberProfile()->create([
            'first_name' => 'Photo',
            'last_name' => 'Owner',
            'membership_status' => 'member',
            'is_active' => true,
            'avatar_path' => 'member-profiles/owner.jpg',
        ]);
        Storage::disk('local')->put($profile->avatar_path, 'image-data');

        $this->actingAs($owner)->get(route('member-profile.photo', $profile))->assertOk();
        /** @var User $otherUser */
        $otherUser = User::factory()->create();
        $this->actingAs($otherUser)->get(route('member-profile.photo', $profile))->assertForbidden();

        /** @var User $admin */
        $admin = User::factory()->create(['email' => 'crownpaysme19@gmail.com']);
        $this->actingAs($admin)->get(route('member-profile.photo', $profile))->assertOk();
        Auth::logout();
        $this->get(route('member-profile.photo', $profile))->assertRedirect('/login');
    }
}
