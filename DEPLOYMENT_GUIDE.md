# Skills Optimization - Deployment Guide

## Pre-Deployment Checklist

### Code Review
- [x] All PHP files compile without syntax errors
- [x] All TypeScript files compile without errors
- [x] No console errors in browser DevTools
- [x] No ESLint warnings
- [x] Code follows project conventions
- [x] All error handling is in place

### Testing
- [x] Database migrations tested locally
- [x] Seeder tested locally
- [x] API endpoints tested locally
- [x] Frontend component tested locally
- [x] Backward compatibility verified
- [x] Mobile responsiveness verified
- [x] Dark mode support verified

### Documentation
- [x] Technical documentation complete
- [x] Implementation guide created
- [x] Architecture diagrams included
- [x] Skills reference provided
- [x] API documentation available

## Deployment Steps

### Step 1: Backup Database (CRITICAL)
```bash
# Create backup before any changes
mysqldump -u root -p nyp_ip_portal > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Step 2: Deploy Code Changes
```bash
# Option A: Via Git
cd /path/to/NYP-IP-Portal
git pull origin main

# Option B: Manual
# Copy the following files to your server:
# - app/Http/Controllers/NapsApiController.php
# - app/Models/NapsSkillGroup.php
# - app/Models/NapsSubSkill.php
# - resources/js/services/napsApi.ts
# - resources/js/Pages/Naps/Application/Index.tsx
# - routes/naps.php
# - database/migrations/2025_12_05_000001_*.php
# - database/migrations/2025_12_05_000002_*.php
# - database/seeders/NapsSkillGroupSeeder.php
```

### Step 3: Install/Update Dependencies
```bash
cd /path/to/NYP-IP-Portal

# PHP dependencies (if needed)
composer install --no-dev

# Node dependencies (if needed)
npm install
npm run build
```

### Step 4: Run Database Migrations
```bash
# Run migrations
php artisan migrate --step

# Output should show:
# 2025_12_05_000001_create_naps_skill_groups_table .... DONE
# 2025_12_05_000002_create_naps_sub_skills_table ...... DONE
```

### Step 5: Seed the Database
```bash
# Seed skill groups and sub-skills
php artisan db:seed --class=NapsSkillGroupSeeder

# Output should show:
# Database\Seeders\NapsSkillGroupSeeder ................ DONE
```

### Step 6: Clear Caches
```bash
# Clear Laravel caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Clear Composer autoload
composer dump-autoload --no-dev
```

### Step 7: Verify Deployment
```bash
# Check migrations status
php artisan migrate:status
# Both 2025_12_05 migrations should show ✓

# Test API endpoint
curl -X GET http://your-domain.com/api/naps/skill-groups | head -50

# Check database
php artisan db:table naps_skill_groups
php artisan db:table naps_sub_skills
```

### Step 8: Test in Browser
1. Navigate to: `https://your-domain.com/naps`
2. Start a new survey
3. Complete Step 1 (Employment)
4. Go to Step 2 (Skills)
5. Verify:
   - [ ] Skill groups load
   - [ ] Groups are collapsible
   - [ ] Can select skills
   - [ ] Counter updates
   - [ ] Can proceed to Step 3
   - [ ] Can complete survey

### Step 9: Monitor Logs
```bash
# Check for errors in logs
tail -f storage/logs/laravel.log

# Check browser console for errors
# (Open DevTools: F12)
```

## Post-Deployment Verification

### Database Verification
```bash
# Count skill groups (should be 5)
php artisan tinker
>>> \App\Models\NapsSkillGroup::count()
5

# Count sub-skills (should be 65)
>>> \App\Models\NapsSubSkill::count()
65

# Exit tinker
>>> exit
```

### API Verification
```bash
# Test the endpoint
curl -s http://your-domain.com/api/naps/skill-groups | jq '.skill_groups | length'
# Output: 5

curl -s http://your-domain.com/api/naps/skill-groups | jq '.total_skills'
# Output: 65
```

### Frontend Verification
1. Open browser DevTools (F12)
2. Go to Network tab
3. Refresh `/naps` page
4. Look for request to `/api/naps/skill-groups`
5. Verify response has 5 groups with 65 skills
6. Check Console tab for any errors (should be none)

## Rollback Procedure (If Needed)

### Quick Rollback
If deployment has critical issues:

```bash
# Option 1: Rollback migrations only
php artisan migrate:rollback --step=2

# This removes the 2 new migrations but keeps the code
# Frontend will fall back to original 6 skills
```

### Full Rollback
If you need to completely revert:

```bash
# 1. Restore database from backup
mysql -u root -p nyp_ip_portal < backup_YYYYMMDD_HHMMSS.sql

# 2. Revert code changes
git checkout HEAD~1 app/Http/Controllers/NapsApiController.php
git checkout HEAD~1 resources/js/Pages/Naps/Application/Index.tsx
git checkout HEAD~1 resources/js/services/napsApi.ts
git checkout HEAD~1 routes/naps.php

# 3. Clear caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# 4. Rebuild frontend (if needed)
npm run build
```

## Monitoring After Deployment

### Daily Checks
- [ ] No errors in `storage/logs/laravel.log`
- [ ] No errors in browser console (F12)
- [ ] Survey completion rate stable
- [ ] API response time acceptable (<200ms)

### Weekly Checks
- [ ] All survey submissions successful
- [ ] Skill group selections storing correctly
- [ ] Dashboard statistics updating
- [ ] No database errors

### Metrics to Track
- API endpoint response time: Should be <200ms
- Database query time: Should be <50ms
- Error rate: Should be 0%
- User completion rate: Should be stable

## Performance Optimization

If needed, optimize performance:

```bash
# Add database index for faster queries
php artisan tinker
>>> DB::statement('CREATE INDEX idx_skill_group_sort ON naps_skill_groups(sort_order)');
>>> DB::statement('CREATE INDEX idx_sub_skill_group ON naps_sub_skills(naps_skill_group_id, sort_order)');
>>> exit
```

## Caching Strategy

To further optimize:

```php
// In config/cache.php or .env
// Cache the skill groups for 1 hour
// They rarely change, so caching is safe
```

Update the API:
```php
public function getSkillGroups()
{
    return Cache::remember('naps.skill_groups', 3600, function () {
        return NapsSkillGroup::with('subSkills')->orderBy('sort_order')->get();
    });
}
```

Clear cache if you update skills:
```bash
php artisan cache:forget naps.skill_groups
```

## Troubleshooting

### Problem: "Skills not loading" or Blank Screen
**Solution:**
1. Check browser console for errors (F12)
2. Check Laravel log: `tail storage/logs/laravel.log`
3. Verify API endpoint: `curl http://localhost/api/naps/skill-groups`
4. If API fails, check database: `php artisan db:table naps_skill_groups`

### Problem: "Can't select skills"
**Solution:**
1. Check React state in browser DevTools (React tab)
2. Verify JavaScript compiled correctly: `npm run build`
3. Clear browser cache: Ctrl+Shift+Delete
4. Try different browser to rule out local caching

### Problem: "Survey not submitting"
**Solution:**
1. Verify selected skills are stored in state
2. Check API request payload in Network tab
3. Check Laravel logs for validation errors
4. Verify `naps_respondents` table exists

### Problem: "Original 6 skills not showing up"
**Solution:**
1. This is normal - new UI uses grouped skills
2. Fallback only shows if API fails
3. To test fallback, temporarily disable API route
4. Existing surveys unaffected

## Support Contacts

- **Database Issues**: Check migration logs
- **API Issues**: Check Laravel logs + Network tab
- **Frontend Issues**: Check browser console + React DevTools
- **General**: Refer to SKILLS_OPTIMIZATION.md documentation

## Checklist After Going Live

- [ ] No critical errors in logs
- [ ] Survey submissions working
- [ ] Skills storing correctly in database
- [ ] Dashboard charts showing new skills
- [ ] Mobile responsiveness verified
- [ ] Dark mode working
- [ ] Multiple browser testing done
- [ ] Performance acceptable
- [ ] Users able to complete surveys
- [ ] Team trained on new feature

---

**Estimated Deployment Time**: 15-30 minutes
**Risk Level**: Low (backward compatible, can rollback in 2 minutes)
**Downtime Required**: None (migrations are safe, no breaking changes)
**Testing Required**: ~10 minutes post-deployment

**Questions?** Refer to:
- SKILLS_OPTIMIZATION.md - Technical details
- SKILLS_IMPLEMENTATION_SUMMARY.md - Quick reference
- ARCHITECTURE_DIAGRAM.md - Visual explanation
