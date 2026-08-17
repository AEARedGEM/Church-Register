<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to APGA Worldwide</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #ffffff;
            color: #000000;
            line-height: 1.6;
            padding: 20px 0;
        }

        .email-wrapper {
            max-width: 680px;
            margin: 0 auto;
            background-color: #ffffff;
        }

        /* Header */
        .email-header {
            background-color: #2563eb;
            padding: 40px 40px 30px;
            border-bottom: 3px solid #000000;
        }

        .logo-section {
            margin-bottom: 20px;
        }

        .logo-title {
            font-size: 26px;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: -0.5px;
            margin-bottom: 8px;
        }

        .logo-subtitle {
            font-size: 13px;
            color: #ffffff;
            font-weight: 400;
            letter-spacing: 0.3px;
        }

        .header-tagline {
            font-size: 15px;
            color: #ffffff;
            font-weight: 400;
            line-height: 1.5;
            padding-top: 15px;
            border-top: 1px solid #000000;
        }

        /* Main Content */
        .email-body {
            padding: 45px 40px;
        }

        .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #000000;
            margin-bottom: 24px;
        }

        .intro-text {
            font-size: 15px;
            color: #000000;
            margin-bottom: 20px;
            line-height: 1.7;
        }

        .intro-text strong {
            color: #000000;
        }

        .highlight-box {
            background-color: #ffffff;
            border-left: 4px solid #2563eb;
            padding: 20px;
            margin: 30px 0;
        }

        .highlight-box p {
            font-size: 15px;
            color: #000000;
            line-height: 1.6;
        }

        /* Section Titles */
        .section-title {
            font-size: 18px;
            font-weight: 600;
            color: #000000;
            margin: 35px 0 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #000000;
        }

        /* Access Items */
        .access-grid {
            margin: 25px 0;
        }

        .access-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 18px;
            padding: 15px;
            background-color: #ffffff;
            border-left: 3px solid #2563eb;
        }

        .access-icon {
            flex-shrink: 0;
            width: 32px;
            height: 32px;
            background-color: #2563eb;
            color: #ffffff;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 14px;
            margin-right: 15px;
        }

        .access-content h4 {
            font-size: 15px;
            font-weight: 600;
            color: #000000;
            margin-bottom: 4px;
        }

        .access-content p {
            font-size: 14px;
            color: #000000;
            line-height: 1.5;
        }

        /* CTA Button */
        .cta-section {
            text-align: center;
            margin: 40px 0;
            padding: 30px;
            background-color: #2563eb;
        }

        .cta-label {
            font-size: 13px;
            color: #ffffff;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 15px;
        }

        .cta-button {
            display: inline-block;
            background-color: #ffffff;
            color: #000000;
            text-decoration: none;
            font-weight: 600;
            font-size: 15px;
            padding: 16px 40px;
            border: 2px solid #ffffff;
            transition: all 0.3s ease;
        }

        .cta-button:hover {
            background-color: #2563eb;
            color: #ffffff;
        }

        .user-email {
            font-size: 14px;
            color: #ffffff;
            margin-top: 15px;
        }

        /* Getting Started Steps */
        .steps-list {
            list-style: none;
            counter-reset: step-counter;
            margin: 25px 0;
        }

        .steps-list li {
            counter-increment: step-counter;
            position: relative;
            padding-left: 50px;
            margin-bottom: 20px;
            font-size: 14px;
            color: #000000;
            line-height: 1.6;
        }

        .steps-list li::before {
            content: counter(step-counter);
            position: absolute;
            left: 0;
            top: 0;
            width: 32px;
            height: 32px;
            background-color: #2563eb;
            color: #ffffff;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 14px;
        }

        .steps-list li strong {
            color: #000000;
        }

        /* Closing */
        .closing-message {
            margin: 35px 0 25px;
            padding: 25px;
            background-color: #ffffff;
            border-top: 3px solid #2563eb;
            font-size: 15px;
            color: #000000;
            line-height: 1.7;
        }

        .signature {
            margin-top: 30px;
            font-size: 14px;
            color: #000000;
        }

        .signature-name {
            font-weight: 600;
            color: #000000;
            margin-bottom: 3px;
        }

        /* Footer */
        .email-footer {
            background-color: #2563eb;
            padding: 35px 40px;
            color: #ffffff;
        }

        .footer-section {
            margin-bottom: 25px;
        }

        .footer-title {
            font-size: 12px;
            color: #ffffff;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 12px;
        }

        .contact-info {
            font-size: 13px;
            line-height: 1.8;
        }

        .contact-info a {
            color: #ffffff;
            text-decoration: none;
            transition: color 0.2s;
        }

        .contact-info a:hover {
            color: #ffffff;
        }

        .social-links {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
        }

        .social-links a {
            color: #ffffff;
            text-decoration: none;
            font-size: 13px;
            padding: 8px 16px;
            border: 1px solid #000000;
            transition: all 0.2s;
            display: inline-block;
        }

        .social-links a:hover {
            color: #ffffff;
            border-color: #2563eb;
        }

        .footer-bottom {
            margin-top: 25px;
            padding-top: 20px;
            border-top: 1px solid #000000;
            font-size: 12px;
            color: #000000;
            text-align: center;
        }

        /* Responsive */
        @media (max-width: 600px) {
            .email-header,
            .email-body,
            .email-footer {
                padding-left: 25px;
                padding-right: 25px;
            }

            .greeting {
                font-size: 22px;
            }

            .access-item {
                flex-direction: column;
            }

            .access-icon {
                margin-bottom: 10px;
            }

            .social-links {
                flex-direction: column;
            }

            .social-links a {
                width: 100%;
                text-align: center;
            }
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <!-- Header -->
        <div class="email-header">
            <div class="logo-section">
                <div class="logo-title">APGA WORLDWIDE</div>
                <div class="logo-subtitle">Apostolic Power Glorious Assembly</div>
            </div>
            <div class="header-tagline">
                Growing God's Kingdom Together in Faith
            </div>
        </div>

        <!-- Main Content -->
        <div class="email-body">
            <h1 class="greeting">Welcome, {{ $userName }}</h1>

            <p class="intro-text">
                Welcome to <strong>APGA Worldwide</strong> — a faith-based community dedicated to spiritual growth, fellowship, and making a difference in the world.
            </p>

            <div class="highlight-box">
                <p>
                    You're now part of a faith-based community dedicated to spiritual growth, fellowship, and building meaningful connections in Christ.
                </p>
            </div>

            <h2 class="section-title">What You Gain Access To</h2>

            <div class="access-grid">
                <div class="access-item">
                    <div class="access-icon">01</div>
                    <div class="access-content">
                        <h4>Attendance Tracking</h4>
                        <p>Keep track of worship services and church activities</p>
                    </div>
                </div>

                <div class="access-item">
                    <div class="access-icon">02</div>
                    <div class="access-content">
                        <h4>Event Management</h4>
                        <p>Discover and register for church events and programs</p>
                    </div>
                </div>

                <div class="access-item">
                    <div class="access-icon">03</div>
                    <div class="access-content">
                        <h4>Member Directory</h4>
                        <p>Connect with fellow church members and community</p>
                    </div>
                </div>

                <div class="access-item">
                    <div class="access-icon">04</div>
                    <div class="access-content">
                        <h4>Prayer Requests</h4>
                        <p>Share and receive prayer support from the community</p>
                    </div>
                </div>

                <div class="access-item">
                    <div class="access-icon">05</div>
                    <div class="access-content">
                        <h4>Invitation League</h4>
                        <p>Invite friends and grow our faith community</p>
                    </div>
                </div>
            </div>

            <!-- CTA -->
            <div class="cta-section">
                <div class="cta-label">Get Started Today</div>
                <a href="{{ $dashboardUrl }}" class="cta-button">Activate Your Account & Access Dashboard</a>
                <div class="user-email">Your Email: <strong>{{$user->email}}</strong></div>
            </div>

            <!-- Getting Started Steps -->
            <h2 class="section-title">Getting Started</h2>

            <ol class="steps-list">
                <li><strong>Complete Your Profile</strong> with your details to join our community</li>
                <li><strong>Explore Events & Programs</strong> that match your interests and faith journey</li>
                <li><strong>Connect with Fellow Members</strong> and participate in small groups and activities</li>
                <li><strong>Share Prayer Requests</strong> and support others in the community</li>
                <li><strong>Invite Friends & Family</strong> to join us in growing God's kingdom together</li>
            </ol>

            <!-- Closing Message -->
            <div class="closing-message">
                Welcome to APGA Worldwide! We're excited to have you join our faith community. Together, we're growing God's kingdom and making a positive impact in the world. Your spiritual journey with us starts now.
            </div>

            <div class="signature">
                <div class="signature-name">Blessings,</div>
                <div>APGA Worldwide Team</div>
                <div>Apostolic Power Glorious Assembly</div>
            </div>
        </div>

        <!-- Footer -->
        <div class="email-footer">
            <div class="footer-section">
                <div class="footer-title">Contact Us</div>
                <div class="contact-info">
                    <div><a href="mailto:info@apgaworldwide.org">info@apgaworldwide.org</a></div>
                    <div>Growing God's Kingdom Together</div>
                </div>
            </div>

            <div class="footer-section">
                <div class="footer-title">About APGA Worldwide</div>
                <div class="contact-info">
                    <div>Apostolic Power Glorious Assembly</div>
                    <div>A faith-based community dedicated to spiritual growth and fellowship</div>
                </div>
            </div>

            <div class="footer-section">
                <div class="footer-title">Follow Us</div>
                <div class="social-links">
                    <a href="https://facebook.com/apgaworldwide">Facebook</a>
                    <a href="https://instagram.com/apgaworldwide">Instagram</a>
                    <a href="https://twitter.com/apgaworldwide">X (Twitter)</a>
                </div>
            </div>

            <div class="footer-bottom">
                © 2025 APGA Worldwide. All rights reserved.
            </div>
        </div>
    </div>
</body>
</html>
