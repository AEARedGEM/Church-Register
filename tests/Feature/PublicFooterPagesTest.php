<?php

namespace Tests\Feature;

use Tests\TestCase;

class PublicFooterPagesTest extends TestCase
{
    public function test_public_footer_pages_are_available(): void
    {
        $this->get('/about')->assertOk();
        $this->get('/mission')->assertOk();
        $this->get('/leadership')->assertOk();
        $this->get('/church-history')->assertOk();
        $this->get('/small-groups')->assertOk();
        $this->get('/volunteer')->assertOk();
        $this->get('/giving')->assertOk();
        $this->get('/media')->assertOk();
        $this->get('/ministries')->assertOk();
        $this->get('/prayer-requests')->assertOk();
        $this->get('/resources')->assertOk();
        $this->get('/support')->assertOk();
        $this->get('/contact')->assertOk();
        $this->get('/location-hours')->assertOk();
        $this->get('/faq')->assertOk();
        $this->get('/send-message')->assertOk();
        $this->get('/privacy')->assertOk();
        $this->get('/terms')->assertOk();
    }
}
