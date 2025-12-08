# Skills Reference - All 65 Skills Organized by Group

## Group 1: Digital & Technology (17 skills)
1. Web Development
2. Mobile App Development
3. UI/UX Design
4. Graphic Design
5. Data Analytics
6. Cloud Computing
7. Cybersecurity
8. Blockchain/Web3
9. Product Design
10. Digital Marketing
11. Social Media Management
12. Software Engineering
13. IT Support
14. Animation & Motion Graphics
15. Video Editing
16. AI & Machine Learning
17. Photography

## Group 2: Vocational & Technical (14 skills)
1. Fashion Design/Tailoring
2. Catering/Baking/Pastry
3. Welding & Fabrication
4. Carpentry/Woodwork
5. Electrical Installation
6. Plumbing
7. Automobile Repairs/Mechatronics
8. Solar Installation/Renewable Energy
9. Hairdressing & Barbing
10. Make-up & Beauty Artistry
11. Interior Decoration
12. POP/Tiling/Painting
13. Aluminum/Metal Work
14. Furniture Making

## Group 3: Business, Entrepreneurship & Finance (12 skills)
1. Business Management
2. Sales & Marketing
3. Project Management
4. Accounting & Bookkeeping
5. Customer Service
6. E-commerce
7. Supply Chain & Logistics
8. Real Estate
9. Market Research
10. Startup Building & Fundraising
11. Product Management
12. Operations Management

## Group 4: Leadership, Public Service & Communication (11 skills)
1. Leadership & People Management
2. Public Speaking
3. Community Organizing
4. Policy & Governance
5. Conflict Resolution
6. Teamwork & Collaboration
7. Emotional Intelligence
8. Event Planning & Coordination
9. Negotiation
10. Coaching & Mentoring
11. Report Writing & Documentation

## Group 5: Creative & Media (11 skills)
1. Creative Writing
2. Content Creation
3. Music Production
4. Acting & Performance
5. Cinematography
6. Videography
7. Storytelling
8. Podcasting
9. Sound Engineering
10. Art & Illustration
11. Crafts & Handmade Products

---

## Summary
- **Total Groups**: 5
- **Total Skills**: 65
- **Distribution**: 17, 14, 12, 11, 11

## SQL Reference

To view skills in the database:

```sql
SELECT 
  g.id as group_id,
  g.name as group_name,
  COUNT(s.id) as skill_count,
  GROUP_CONCAT(s.name ORDER BY s.sort_order SEPARATOR ', ') as skills
FROM naps_skill_groups g
LEFT JOIN naps_sub_skills s ON s.naps_skill_group_id = g.id
WHERE g.deleted_at IS NULL AND s.deleted_at IS NULL
GROUP BY g.id, g.name
ORDER BY g.sort_order;
```

## API Response Example

```json
{
  "success": true,
  "skill_groups": [
    {
      "id": 1,
      "name": "Digital & Technology",
      "description": "Digital skills, software development, and technology-related expertise",
      "sort_order": 1,
      "sub_skills": [
        { "id": 1, "name": "Web Development", "group_id": 1 },
        { "id": 2, "name": "Mobile App Development", "group_id": 1 },
        ...
      ]
    },
    ...
  ],
  "total_skills": 65
}
```

## Frontend Selection Example

When a user selects skills, the `selectedSkills` array looks like:
```typescript
selectedSkills = [1, 2, 5, 10]  // IDs from naps_sub_skills table
```

This is stored in the survey submission as:
```json
{
  "selected_skills": [1, 2, 5, 10]
}
```

And stored in the database as:
```sql
UPDATE naps_respondents 
SET skills = '[1, 2, 5, 10]'
WHERE id = 123;
```

---

**Last Updated**: 2025-12-05
**Version**: 1.0
**Status**: Production Ready
