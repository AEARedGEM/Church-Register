<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to NYP-IP Portal</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f5f5f5;
            color: #1a1a1a;
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
            background-color: #1a1a1a;
            padding: 40px 40px 30px;
            border-bottom: 3px solid #333333;
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
            color: #b3b3b3;
            font-weight: 400;
            letter-spacing: 0.3px;
        }

        .header-tagline {
            font-size: 15px;
            color: #e0e0e0;
            font-weight: 400;
            line-height: 1.5;
            padding-top: 15px;
            border-top: 1px solid #333333;
        }

        /* Main Content */
        .email-body {
            padding: 45px 40px;
        }

        .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 24px;
        }

        .intro-text {
            font-size: 15px;
            color: #4a4a4a;
            margin-bottom: 20px;
            line-height: 1.7;
        }

        .intro-text strong {
            color: #1a1a1a;
        }

        .highlight-box {
            background-color: #f8f8f8;
            border-left: 4px solid #1a1a1a;
            padding: 20px;
            margin: 30px 0;
        }

        .highlight-box p {
            font-size: 15px;
            color: #2a2a2a;
            line-height: 1.6;
        }

        /* Section Titles */
        .section-title {
            font-size: 18px;
            font-weight: 600;
            color: #1a1a1a;
            margin: 35px 0 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e5e5e5;
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
            background-color: #fafafa;
            border-left: 3px solid #666666;
        }

        .access-icon {
            flex-shrink: 0;
            width: 32px;
            height: 32px;
            background-color: #1a1a1a;
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
            color: #1a1a1a;
            margin-bottom: 4px;
        }

        .access-content p {
            font-size: 14px;
            color: #5a5a5a;
            line-height: 1.5;
        }

        /* CTA Button */
        .cta-section {
            text-align: center;
            margin: 40px 0;
            padding: 30px;
            background-color: #1a1a1a;
        }

        .cta-label {
            font-size: 13px;
            color: #b3b3b3;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 15px;
        }

        .cta-button {
            display: inline-block;
            background-color: #ffffff;
            color: #1a1a1a;
            text-decoration: none;
            font-weight: 600;
            font-size: 15px;
            padding: 16px 40px;
            border: 2px solid #ffffff;
            transition: all 0.3s ease;
        }

        .cta-button:hover {
            background-color: #1a1a1a;
            color: #ffffff;
        }

        .user-email {
            font-size: 14px;
            color: #b3b3b3;
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
            color: #4a4a4a;
            line-height: 1.6;
        }

        .steps-list li::before {
            content: counter(step-counter);
            position: absolute;
            left: 0;
            top: 0;
            width: 32px;
            height: 32px;
            background-color: #1a1a1a;
            color: #ffffff;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 14px;
        }

        .steps-list li strong {
            color: #1a1a1a;
        }

        /* Closing */
        .closing-message {
            margin: 35px 0 25px;
            padding: 25px;
            background-color: #f8f8f8;
            border-top: 3px solid #1a1a1a;
            font-size: 15px;
            color: #2a2a2a;
            line-height: 1.7;
        }

        .signature {
            margin-top: 30px;
            font-size: 14px;
            color: #4a4a4a;
        }

        .signature-name {
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 3px;
        }

        /* Footer */
        .email-footer {
            background-color: #1a1a1a;
            padding: 35px 40px;
            color: #b3b3b3;
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
            color: #b3b3b3;
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
            color: #b3b3b3;
            text-decoration: none;
            font-size: 13px;
            padding: 8px 16px;
            border: 1px solid #333333;
            transition: all 0.2s;
            display: inline-block;
        }

        .social-links a:hover {
            color: #ffffff;
            border-color: #666666;
        }

        .footer-bottom {
            margin-top: 25px;
            padding-top: 20px;
            border-top: 1px solid #333333;
            font-size: 12px;
            color: #808080;
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
                <div class="logo-title">NYP-IP PORTAL</div>
                <div class="logo-subtitle">Nigeria Youth Parliament Industrialization Program Portal</div>
            </div>
            <div class="header-tagline">
                Powered by LuxuryX Technologies & TradeFi Ltd, The Nigeria Youth Parliament, and AfaraHub Limited
            </div>
        </div>

        <!-- Main Content -->
        <div class="email-body">
            <h1 class="greeting">Welcome, {{ $userName }}</h1>

            <p class="intro-text">
                Welcome to the <strong>Nigeria Youth Parliament Industrialization Program (NYP-IP)</strong> — a national network of builders, innovators, and entrepreneurs committed to transforming Nigeria's industrial and digital economy.
            </p>

            <div class="highlight-box">
                <p>
                    You're now part of a national ecosystem where ideas turn into industries — powered by decentralized finance, innovation, and youth energy.
                </p>
            </div>

            <h2 class="section-title">What You Gain Access To</h2>

            <div class="access-grid">
                <div class="access-item">
                    <div class="access-icon">01</div>
                    <div class="access-content">
                        <h4>Industrialization Programs</h4>
                        <p>Startup bootcamps, mentorships and business incubation</p>
                    </div>
                </div>

                <div class="access-item">
                    <div class="access-icon">02</div>
                    <div class="access-content">
                        <h4>Tokenization, TradeFi & DeFi Funding</h4>
                        <p>Access working capital through tokenized industrial finance ($IND, USDI)</p>
                    </div>
                </div>

                <div class="access-item">
                    <div class="access-icon">03</div>
                    <div class="access-content">
                        <h4>Training & Skills Modules</h4>
                        <p>Tech, vocational, and soft skill empowerment</p>
                    </div>
                </div>

                <div class="access-item">
                    <div class="access-icon">04</div>
                    <div class="access-content">
                        <h4>Growth Network</h4>
                        <p>Connect with mentors, investors and youth clusters across states</p>
                    </div>
                </div>

                <div class="access-item">
                    <div class="access-icon">05</div>
                    <div class="access-content">
                        <h4>Regional Leaders Board</h4>
                        <p>Track performance by state and unlock growth challenges</p>
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
                <li><strong>Complete Your Profile</strong> with your details and business info to verify your identity</li>
                <li><strong>Choose Your Track</strong> from Tech, Vocational, or Entrepreneurial programs that match your interests</li>
                <li><strong>Connect with Your Chapter</strong> and join conversations shaping your state's productivity</li>
                <li><strong>Learn and Build</strong> by applying for TradeFi or Equity funding via your dashboard</li>
                <li><strong>Track Your Impact</strong> and earn badges as you climb the Regional Leaders Board</li>
            </ol>

            <!-- Closing Message -->
            <div class="closing-message">
                Together, we're building a new era of industrial youth power for Nigeria. Welcome once again — your journey to empowerment, innovation, and national impact starts now.
            </div>

            <div class="signature">
                <div class="signature-name">Warm regards,</div>
                <div>LuxuryX Technologies & TradeFi Ltd</div>
                <div>AfaraHub Team | The Nigeria Youth Parliament</div>
            </div>
        </div>

        <!-- Footer -->
        <div class="email-footer">
            <div class="footer-section">
                <div class="footer-title">Contact Us</div>
                <div class="contact-info">
                    <div><a href="mailto:partnerships@luxuryxtech.org.ng">partnerships@luxuryxtech.org.ng</a></div>
                    <div><a href="mailto:info@luxuryxtech.com">info@luxuryxtech.com</a></div>
                </div>
            </div>

            <div class="footer-section">
                <div class="footer-title">Visit Our Platforms</div>
                <div class="contact-info">
                    <div><a href="https://nypipportal.luxuryxtech.org.ng">nypipportal.luxuryxtech.org.ng</a></div>
                    <div><a href="https://luxuryxtech.org.ng">luxuryxtech.org.ng</a></div>
                </div>
            </div>

            <div class="footer-section">
                <div class="footer-title">Follow Us</div>
                <div class="social-links">
                    <a href="https://t.me/nypipcommunity">Telegram</a>
                    <a href="https://www.linkedin.com/company/luxuryx-technologies">LinkedIn</a>
                    <a href="https://x.com/LuxuryX_Tech">X (Twitter)</a>
                    <a href="https://www.facebook.com/LuxuryXTechnologies">Facebook</a>
                </div>
            </div>

            <div class="footer-bottom">
                © 2025 NYP-IP Portal. All rights reserved.
            </div>
        </div>
    </div>
</body>
</html>
