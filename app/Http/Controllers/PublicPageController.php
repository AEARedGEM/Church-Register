<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Application;
use Inertia\Inertia;

class PublicPageController extends Controller
{
    // About NYP Institution Pages
    public function about()
    {
        return Inertia::render('Public/About', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function leadership()
    {
        return Inertia::render('Public/Leadership', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function governance()
    {
        return Inertia::render('Public/Governance', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function zones()
    {
        return Inertia::render('Public/Zones', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function mission()
    {
        return Inertia::render('Public/Mission', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    // NYP-IP Program Pages
    public function program()
    {
        return Inertia::render('Public/Program', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function partners()
    {
        return Inertia::render('Public/Partners', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function funding()
    {
        return Inertia::render('Public/Funding', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function owopMandate()
    {
        return Inertia::render('Public/OwopMandate', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function ecosystem()
    {
        return Inertia::render('Public/Ecosystem', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function impact()
    {
        return Inertia::render('Public/Impact', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    // Documentation Pages
    public function whitepaper()
    {
        return Inertia::render('Public/Documentation/Whitepaper', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function policy()
    {
        return Inertia::render('Public/Documentation/Policy', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function fundingFramework()
    {
        return Inertia::render('Public/Documentation/FundingFramework', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function infrastructure()
    {
        return Inertia::render('Public/Documentation/Infrastructure', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function specs()
    {
        return Inertia::render('Public/Documentation/Specs', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    // Resources & Community Pages
    public function community()
    {
        return Inertia::render('Public/Community', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function knowledgeBase()
    {
        return Inertia::render('Public/KnowledgeBase', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function support()
    {
        return Inertia::render('Public/Support', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function faq()
    {
        return Inertia::render('Public/FAQ', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function feedback()
    {
        return Inertia::render('Public/Feedback', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    // Legal & Compliance Pages
    public function privacy()
    {
        return Inertia::render('Public/Legal/Privacy', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function terms()
    {
        return Inertia::render('Public/Legal/Terms', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function cookies()
    {
        return Inertia::render('Public/Legal/Cookies', [
            'laravelVersion' => Application::VERSION,
        ]);
    }

    public function disclaimer()
    {
        return Inertia::render('Public/Legal/Disclaimer', [
            'laravelVersion' => Application::VERSION,
        ]);
    }
}
