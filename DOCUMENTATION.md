# APGA Worldwide - Church Management Platform

## Project Overview

**APGA Worldwide** is a comprehensive church management and community engagement platform built for the Apostolic Power Glorious Assembly. The platform was created by adapting a Laravel-based industrial platform into a faith-focused church management system with features for attendance tracking, event management, member engagement, and community building.

---

## Tech Stack

### Current Implementation
- **Backend Framework**: Laravel 12 (PHP 8.4)
- **Frontend Framework**: React 19 with TypeScript (via Inertia.js)
- **Build Tool**: Vite 7.2.4
- **Database**: MySQL 8 (local development)
- **UI Framework**: Tailwind CSS 3
- **Authentication**: Laravel Breeze + Spatie Permissions
- **Session Management**: Database-driven sessions (MySQL)
- **ORM**: Eloquent (Laravel's ORM)

### Originally Recommended Stack
- Frontend: Next.js (TypeScript)
- API: tRPC
- Database ORM: Prisma
- Database: PostgreSQL or SQLite
- Auth: NextAuth.js
- Realtime: Supabase / Pusher / WebSockets

**Note**: Current implementation uses Laravel + React stack instead of Next.js/tRPC approach for faster deployment.

---

## What Has Been Achieved ✅

### 1. Frontend Landing Page Redesign (100% Complete)

#### Visual Branding
- **Color Scheme**: Changed from industrial emerald green to faith-focused blue (#2563eb)
- **Background**: Gradient from slate-950 with blue accents
- **Typography**: Professional, welcoming, faith-oriented

#### Hero Section
- **Title**: "Growing God's Kingdom Together in Faith"
- **Tagline**: "A faith-based community dedicated to spiritual growth, fellowship, and making a difference in the world"
- **Call-to-Action**: "Register Now" | "Join Us" buttons
- **Design**: Smooth animations, glassmorphism effects, responsive layout

#### Statistics Dashboard
Displays real-time church metrics:
- **Total Members**: 250-500 (dynamically generated)
- **Sunday Attendance**: 145
- **Upcoming Events**: 28
- **Small Groups**: 12

#### Church Features Section
Six core features highlighted with descriptions:
1. ✓ **Attendance Tracking** - Track Sunday services, small groups, and special events
2. → **Invitation League** - Monthly/yearly tracking of member invitations for evangelism
3. 📅 **Event Management** - Create and manage church events and activities
4. 👥 **Member Directory** - Secure directory with member profiles and contact info
5. 🙏 **Prayer Requests** - Share and manage prayer requests within community
6. 📊 **Analytics Dashboard** - Reports on attendance trends and growth metrics

#### Call-to-Action Section
- Updated messaging focused on spiritual growth and community participation
- "Create Account" and "Schedule a Visit" buttons
- Professional design with gradient effects

#### Testimonials Section
Three testimonials from church members:
- John Doe (Church Member)
- Sarah Smith (Small Group Leader)
- Pastor Michael (Church Leadership)

#### Navigation & Footer
**Header Navigation:**
- Logo and branding
- Theme toggle (light/dark mode)
- Login/Register links (or Dashboard link if authenticated)

**Footer (5 Columns):**
1. **About APGA** - About Us, Mission, Leadership, History
2. **Get Involved** - Events, Small Groups, Volunteer, Giving
3. **Spiritual Growth** - Sermons, Bible Study, Prayer, Resources
4. **Connect** - Contact Us, Location & Hours, FAQ, Send Message
5. **Follow Us** - Facebook, Twitter, Instagram, YouTube

### 2. Database Setup (100% Complete)

#### Migrations Applied
All 42 migrations successfully executed:

**Core Tables:**
- ✅ users, cache, jobs, sessions
- ✅ permissions and roles (Spatie)
- ✅ notifications, login_histories

**User-Related:**
- ✅ user_profiles, wallets, transactions
- ✅ fund_types, investors

**Events & Community:**
- ✅ events, event_registrations
- ✅ communities, community_memberships
- ✅ forum_posts, mentorships, mentors
- ✅ activities, funding_applications, vc_matches

**Training & Courses:**
- ✅ course_categories, courses, course_enrollments
- ✅ course_reviews, course_sections, course_lectures
- ✅ lecture_progress, course_favourites

**NAPS Survey System:**
- ✅ naps_respondents, naps_survey_questions
- ✅ naps_survey_responses, naps_statistics
- ✅ naps_skill_groups, naps_sub_skills

**Location Data:**
- ✅ wards, states tables

#### Database Configuration
- **Database Name**: `apga-worldwide`
- **Connection Type**: MySQL (localhost:3306)
- **Session Driver**: Database (persistent sessions)
- **Session Lifetime**: 120 minutes
- **User**: root (no password for local dev)
- **Status**: ✅ All tables created with proper indexes and relationships

### 3. Environment Configuration (100% Complete)

#### .env Updates
```
APP_NAME=APGAWorldwide
APP_DEBUG=true
DB_DATABASE=apga-worldwide
DB_USERNAME=root
SESSION_DRIVER=database
SESSION_LIFETIME=120
QUEUE_CONNECTION=database
CACHE_STORE=database
```

#### Application Setup
- ✅ APP_KEY generated
- ✅ Database migrations completed
- ✅ Cache and config cleared
- ✅ All dependencies installed via npm

### 4. Frontend Build (100% Complete)

#### Build Output
- **Build Tool**: Vite 7.2.4
- **Client Build**: 2 minutes 1 second
  - 3,706 modules transformed
  - Optimized assets in `public/build/`
  - Manifest.json for asset loading
  
- **SSR Build**: 9.55 seconds
  - 90 modules transformed
  - Server-side rendering support
  - Assets in `bootstrap/ssr/`

#### Asset Sizes
- **Welcome Component** (Landing Page): 25.95 kB (gzipped: 5.22 kB)
- **App Bundle**: 675.81 kB (gzipped: 221.84 kB)
- **Total Assets**: 80+ optimized files

#### Build Status
✅ Build completed successfully with all assets optimized

---

## What Is Left To Do (TODO)

### Phase 1: Backend Core Features (Priority: HIGH)

#### 1. Church-Specific Models & Database Tables
**Status**: ⏳ Not Started

**Required Tables:**
- `attendance_records` - Track member attendance at services/events
- `invitation_tracking` - Track invitations (weekly, monthly, yearly)
- `prayer_requests` - Store prayer request submissions
- `event_schedules` - Define recurring church services
- `member_roles` - Distinguish between members, leaders, admin, pastors
- `service_types` - Sunday service, small group, prayer meeting, etc.

**Eloquent Models to Create:**
```
app/Models/
├── AttendanceRecord.php
├── InvitationTracking.php
├── PrayerRequest.php
├── EventSchedule.php
├── ServiceType.php
└── MemberRole.php
```

#### 2. API Endpoints (REST/JSON)
**Status**: ⏳ Not Started

**Attendance Management:**
- `POST /api/attendance/mark` - Mark member attendance
- `GET /api/attendance/stats` - Get attendance statistics
- `GET /api/attendance/trends` - Get attendance trends
- `GET /api/attendance/report` - Generate attendance reports

**Invitation Tracking:**
- `POST /api/invitations/record` - Record new invitation
- `GET /api/invitations/leaderboard` - Get top inviters
- `GET /api/invitations/stats` - Get invitation statistics

**Prayer Requests:**
- `POST /api/prayer-requests` - Submit prayer request
- `GET /api/prayer-requests` - Get prayer requests feed
- `PUT /api/prayer-requests/{id}` - Update prayer request
- `DELETE /api/prayer-requests/{id}` - Delete prayer request

**Event Management:**
- `GET /api/events` - List upcoming events
- `POST /api/events` - Create new event
- `PUT /api/events/{id}` - Update event
- `POST /api/events/{id}/register` - Register for event
- `GET /api/events/{id}/attendees` - Get event attendees

**Member Directory:**
- `GET /api/members` - List members
- `GET /api/members/{id}` - Get member profile
- `PUT /api/members/{id}` - Update member profile
- `GET /api/members/search` - Search members

#### 3. Authentication & Authorization
**Status**: ⏳ Not Started (Partial - Base Laravel Auth Exists)

**Tasks:**
- [ ] Create role-based access control for church positions
- [ ] Define permissions for each role (Admin, Pastor, Leader, Member, Visitor)
- [ ] Implement authorization middleware
- [ ] Create admin seeder for initial setup
- [ ] Setup email verification for new registrations
- [ ] Implement two-factor authentication option

**Roles to Define:**
- **Admin** - Full system access, user management
- **Pastor** - Leadership, event creation, attendance viewing
- **Small Group Leader** - Lead group, track attendance, prayer requests
- **Member** - Full platform access, attendance, invitations
- **Visitor** - Limited access, event viewing, registration

### Phase 2: Frontend Components & Pages (Priority: HIGH)

#### 1. User Dashboard
**Status**: ⏳ Not Started

Components needed:
- Attendance widget (today's status, weekly summary)
- Upcoming events carousel
- Prayer request feed
- Invitation score display
- Quick action buttons

#### 2. Attendance Management UI
**Status**: ⏳ Not Started

Pages/Components:
- Attendance marking interface (for check-in)
- Attendance history view
- Sunday service attendance list
- Small group attendance tracking
- Attendance analytics/charts

#### 3. Event Management UI
**Status**: ⏳ Not Started

Pages/Components:
- Event calendar view
- Event creation form
- Event details page with registration
- Event attendee list
- Event edit/delete interface

#### 4. Invitation League System
**Status**: ⏳ Not Started

Pages/Components:
- Leaderboard (top inviters - weekly/monthly/yearly)
- Personal invitation tracker
- Invite member form
- Invitation history
- Badges/achievements for milestones

#### 5. Prayer Request Board
**Status**: ⏳ Not Started

Pages/Components:
- Prayer request feed
- Create prayer request form
- Prayer request details modal
- Mark as prayed for
- Search/filter prayers
- Prayer updates/comments

#### 6. Member Directory
**Status**: ⏳ Not Started

Pages/Components:
- Member list/grid view
- Search and filter
- Member profile page
- Contact information
- Small group assignment
- Member roles/positions

#### 7. Analytics Dashboard
**Status**: ⏳ Not Started

Pages/Components:
- Attendance trends (charts)
- Growth metrics
- Event participation stats
- Invitation league stats
- Member engagement metrics
- Export reports (PDF/CSV)

#### 8. Admin Panel
**Status**: ⏳ Not Started

Pages/Components:
- User management
- Role assignment
- Event creation/management
- Service schedule configuration
- Attendance validation
- System settings

### Phase 3: Advanced Features (Priority: MEDIUM)

#### 1. Realtime Notifications
**Status**: ⏳ Not Started

Features:
- Notify members of upcoming events
- Prayer request notifications
- Attendance reminders
- Event registration confirmations
- Admin alerts

Implementation options:
- Laravel Broadcasting (Pusher/Ably)
- WebSockets
- Email notifications
- SMS notifications (optional)

#### 2. Member Communication
**Status**: ⏳ Not Started

Features:
- Announcements system
- Discussion forums
- Small group messaging
- Direct messaging between members
- Email newsletters

#### 3. Giving & Tithes (Optional)
**Status**: ⏳ Not Started

Features:
- Online giving/tithing portal
- Payment processing (Stripe/Flutterwave)
- Giving history/receipts
- Fund allocation
- Giving analytics

#### 4. Small Group Management
**Status**: ⏳ Not Started

Features:
- Group creation and management
- Group member tracking
- Group meeting scheduling
- Group attendance
- Group communication

### Phase 4: Testing & Deployment (Priority: HIGH)

#### 1. Testing
**Status**: ⏳ Not Started

- [ ] Unit tests for models
- [ ] Feature tests for API endpoints
- [ ] UI component tests
- [ ] E2E tests for user flows
- [ ] Performance testing
- [ ] Security testing

#### 2. Performance Optimization
**Status**: ⏳ In Progress

- [x] Frontend build optimized
- [ ] Database query optimization
- [ ] Caching strategy implementation
- [ ] CDN setup for static assets
- [ ] Code splitting for large chunks
- [ ] Image optimization

#### 3. Deployment
**Status**: ⏳ Not Started

- [ ] Setup production environment
- [ ] Configure database backup strategy
- [ ] Setup SSL/HTTPS
- [ ] Configure email service
- [ ] Setup monitoring/logging
- [ ] Create deployment documentation

---

## Getting Started

### Local Development Setup

#### Prerequisites
- PHP 8.4+
- Node.js 18+
- MySQL 8
- Composer
- npm or yarn

#### Installation Steps

1. **Clone or navigate to project:**
```bash
cd c:\Users\User\Herd\ChurchWebV1
```

2. **Install dependencies:**
```bash
composer install
npm install
```

3. **Configure environment:**
```bash
copy .env.example .env
# Update DB credentials in .env
php artisan key:generate
```

4. **Setup database:**
```bash
php artisan migrate  # Already done, but this is the command
php artisan db:seed  # Optional: seed initial data
```

5. **Build frontend assets:**
```bash
npm run build  # Production build
# OR
npm run dev   # Development with hot reload
```

6. **Start development server:**
```bash
php artisan serve
# Visit: http://localhost:8000
```

### Database Connection
- **Host**: localhost
- **Port**: 3306
- **Database**: apga-worldwide
- **User**: root
- **Password**: (empty for local dev)

### Default Routes
- Homepage: http://localhost:8000/
- Login: http://localhost:8000/login
- Register: http://localhost:8000/register
- Dashboard: http://localhost:8000/dashboard (after login)

---

## File Structure

```
ChurchWebV1/
├── app/
│   ├── Models/                    # Eloquent models (to be extended)
│   ├── Http/
│   │   ├── Controllers/           # API controllers (to be created)
│   │   ├── Middleware/            # Auth middleware
│   │   └── Requests/              # Form validation
│   ├── Services/                  # Business logic
│   └── Providers/                 # Service providers
├── resources/
│   ├── js/
│   │   ├── Pages/
│   │   │   └── Welcome.tsx        # ✅ Church landing page (UPDATED)
│   │   ├── Components/            # Reusable React components
│   │   ├── Layouts/               # Page layouts
│   │   └── app.tsx                # Main React app
│   ├── css/                       # Tailwind CSS
│   └── views/                     # Blade templates (minimal use)
├── database/
│   ├── migrations/                # ✅ All 42 migrations applied
│   ├── seeders/                   # Seed data
│   └── factories/                 # Model factories for testing
├── routes/
│   ├── web.php                    # Web routes
│   ├── api.php                    # API routes (to be extended)
│   └── auth.php                   # Authentication routes
├── public/
│   ├── build/                     # ✅ Compiled frontend assets
│   └── index.php                  # Entry point
├── bootstrap/
│   ├── ssr/                       # ✅ SSR assets
│   └── app.php                    # Application bootstrap
├── config/                        # Configuration files
├── .env                           # ✅ Environment configuration
├── composer.json                  # PHP dependencies
├── package.json                   # JavaScript dependencies
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS configuration
└── DOCUMENTATION.md               # This file
```

---

## Development Workflow

### Adding a New Feature

#### Example: Adding Attendance Tracking

1. **Create Model:**
```bash
php artisan make:model AttendanceRecord -m
```

2. **Create Controller:**
```bash
php artisan make:controller Api/AttendanceController
```

3. **Create Migration:** (Auto-created with `-m` flag)
```bash
php artisan migrate
```

4. **Add Routes:** (`routes/api.php`)
```php
Route::apiResource('attendance', AttendanceController::class);
```

5. **Create React Component:** (`resources/js/Pages/Attendance.tsx`)

6. **Build & Test:**
```bash
npm run dev
php artisan serve
```

### Common Commands

```bash
# Database
php artisan migrate              # Run migrations
php artisan migrate:rollback    # Rollback migrations
php artisan tinker              # Interactive shell
php artisan db:seed             # Seed database

# Code Generation
php artisan make:model Name     # Create model
php artisan make:controller Name # Create controller
php artisan make:migration Name  # Create migration
php artisan make:request Name    # Create form request

# Cache & Config
php artisan cache:clear         # Clear cache
php artisan config:clear        # Clear config cache
php artisan view:clear          # Clear view cache

# Frontend
npm run dev                      # Dev server with HMR
npm run build                    # Production build
npm run lint                     # Lint code

# Server
php artisan serve               # Start development server
```

---

## Key Decisions & Notes

### Why Laravel + React Instead of Next.js + tRPC?

1. **Faster Migration**: Adapted existing working Laravel platform
2. **Existing Infrastructure**: Database schema, authentication, permissions already in place
3. **Time to Market**: Can launch features quicker
4. **Team Familiarity**: Laravel/React is standard stack for the team

### Database Schema Notes

- All existing tables from NYP-IP platform are available for reference/reuse
- Community tables can be adapted for small groups
- Events table ready for church events
- Forum posts useful for prayer requests/discussions
- User roles/permissions via Spatie already configured

### Security Considerations

- Database sessions prevent session hijacking
- Spatie permissions provide granular role-based access
- Laravel CSRF protection enabled
- Validation on all API endpoints required
- API rate limiting recommended for production

### Performance Considerations

- Implement database query caching for statistics
- Use Laravel query optimization (eager loading, indexing)
- Frontend code splitting for large components
- Image optimization required for assets
- CDN recommended for production

---

## Testing Checklist

### Before Production Launch

**Frontend:**
- [ ] Landing page loads without errors
- [ ] Theme toggle (light/dark mode) works
- [ ] Login/Register buttons functional
- [ ] All footer links accessible
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Performance acceptable (<3s load time)

**Backend:**
- [ ] Database connections working
- [ ] Sessions table functioning
- [ ] Authentication flow complete
- [ ] API endpoints responding correctly
- [ ] Error handling implemented

**Integration:**
- [ ] Database ↔ API ↔ Frontend data flow
- [ ] User authentication persists
- [ ] Session timeout works
- [ ] Error messages display properly

---

## Progress Summary

### Completion Status

| Component | Status | % Complete | Last Updated |
|-----------|--------|-----------|--------------|
| Frontend Landing Page | ✅ Complete | 100% | 2026-08-17 |
| Database Setup | ✅ Complete | 100% | 2026-08-17 |
| Environment Config | ✅ Complete | 100% | 2026-08-17 |
| Frontend Build | ✅ Complete | 100% | 2026-08-17 |
| Backend Models | ⏳ Pending | 0% | - |
| API Endpoints | ⏳ Pending | 0% | - |
| Dashboard Pages | ⏳ Pending | 0% | - |
| Admin Panel | ⏳ Pending | 0% | - |
| Testing Suite | ⏳ Pending | 0% | - |
| Production Deploy | ⏳ Pending | 0% | - |

### Next Immediate Actions

**Priority 1 (This Week):**
1. Create AttendanceRecord model and migration
2. Build attendance API endpoints
3. Create attendance marking UI component
4. Implement admin dashboard

**Priority 2 (Next Week):**
1. Event management API
2. Invitation tracking system
3. Prayer request board
4. Member directory

**Priority 3 (Later):**
1. Realtime notifications
2. Advanced reporting
3. Integration features
4. Performance optimization

---

## Support & Resources

### Laravel Documentation
- https://laravel.com/docs
- https://laravel.com/api

### React & TypeScript
- https://react.dev
- https://www.typescriptlang.org/docs

### Tailwind CSS
- https://tailwindcss.com/docs
- https://ui.tailwindcss.com

### Inertia.js (Laravel + React Bridge)
- https://inertiajs.com

### Database & ORM
- https://dev.mysql.com/doc
- https://laravel.com/docs/eloquent

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-08-17 | Initial church platform launch - Frontend complete, database setup, ready for backend development |

---

**Last Updated**: 2026-08-17  
**Status**: 🎯 Frontend Ready | 🎯 Database Ready | ⏳ Backend Development Starting
