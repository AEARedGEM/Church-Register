<?php

namespace Tests\Feature;

use App\Models\ChurchNewsletterSubscriber;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChurchNewsletterSubscriptionFeatureTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_visitor_can_subscribe_once_and_repeated_subscription_is_idempotent(): void
    {
        $this->post('/newsletter/subscribe', ['email' => '  Member@Example.com '])
            ->assertRedirect('/');
        $this->post('/newsletter/subscribe', ['email' => 'member@example.com'])
            ->assertRedirect('/');

        $this->assertDatabaseCount('church_newsletter_subscribers', 1);
        $this->assertDatabaseHas('church_newsletter_subscribers', ['email' => 'member@example.com', 'status' => 'active']);
    }

    public function test_unsubscribed_address_can_subscribe_again(): void
    {
        $subscriber = ChurchNewsletterSubscriber::create([
            'email' => 'member@example.com',
            'unsubscribe_token' => ChurchNewsletterSubscriber::newUnsubscribeToken(),
            'status' => 'unsubscribed',
            'unsubscribed_at' => now(),
        ]);

        $this->post('/newsletter/subscribe', ['email' => $subscriber->email])->assertRedirect('/');

        $this->assertDatabaseHas('church_newsletter_subscribers', ['id' => $subscriber->id, 'status' => 'active', 'unsubscribed_at' => null]);
    }

    public function test_valid_token_unsubscribes_and_unknown_token_is_not_found(): void
    {
        $subscriber = ChurchNewsletterSubscriber::create([
            'email' => 'member@example.com',
            'unsubscribe_token' => ChurchNewsletterSubscriber::newUnsubscribeToken(),
            'status' => 'active',
            'subscribed_at' => now(),
        ]);

        $this->get('/unsubscribe/' . $subscriber->unsubscribe_token)->assertOk();
        $this->assertDatabaseHas('church_newsletter_subscribers', ['id' => $subscriber->id, 'status' => 'unsubscribed']);
        $this->get('/unsubscribe/unknown-token')->assertNotFound();
    }

    public function test_newsletter_admin_board_lists_subscribers_without_exposing_tokens(): void
    {
        $admin = User::factory()->create();
        $subscriber = ChurchNewsletterSubscriber::create([
            'email' => 'member@example.com',
            'unsubscribe_token' => 'private-token-value',
            'status' => 'active',
            'subscribed_at' => now(),
        ]);

        $this->actingAs($admin)
            ->get('/church-admin/newsletter-subscribers')
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->where('subscribers.0.email', $subscriber->email)
                ->missing('subscribers.0.unsubscribe_token')
            );
    }
}
