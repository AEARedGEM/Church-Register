<?php

namespace Tests\Feature;

use Tests\TestCase;

class NapsPublicPageTest extends TestCase
{
    public function test_naps_public_page_renders_the_survey_entry_form(): void
    {
        $response = $this->get('/survey');

        $response->assertStatus(200);
        $response->assertSee('NAP/S Survey');
        $response->assertSee('Personal Information');
    }
}
