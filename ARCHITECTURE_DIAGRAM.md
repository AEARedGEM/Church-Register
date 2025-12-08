# Skills Section Optimization - Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      React Frontend                          │
│              resources/js/Pages/Naps/Application/            │
│                      Index.tsx                               │
│                                                              │
│  ┌─────────────────────────────────────────────────┐         │
│  │  Step 2: Skills Component                       │         │
│  │  State:                                         │         │
│  │  - skillGroups: SkillGroup[]                    │         │
│  │  - expandedGroups: Set<number>                  │         │
│  │  - selectedSkills: number[]                     │         │
│  │                                                 │         │
│  │  Functions:                                     │         │
│  │  - toggleGroup(groupId)                         │         │
│  │  - toggleSubSkill(subSkillId)                   │         │
│  │                                                 │         │
│  │  UI:                                            │         │
│  │  - Collapsible Groups                           │         │
│  │  - Skill Grid (when expanded)                   │         │
│  │  - Selection Counter                            │         │
│  │  - Fallback: Original 6 skills                  │         │
│  └─────────────────────────────────────────────────┘         │
└─────────────────────────────────────────────────────────────┘
             │
             │ napsApi.getSkillGroups()
             │ GET /api/naps/skill-groups
             │ (useEffect on mount)
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│                    Laravel Backend                          │
│           app/Http/Controllers/NapsApiController           │
│                                                             │
│  ┌──────────────────────────────────────────────┐          │
│  │  getSkillGroups() Method                     │          │
│  │  ├─ NapsSkillGroup::with('subSkills')       │          │
│  │  ├─ ->orderBy('sort_order')                 │          │
│  │  ├─ ->get()                                 │          │
│  │  └─ Returns JSON with 5 groups + 65 skills  │          │
│  └──────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
             │
             │ Query
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│                   Database Layer                            │
│                     MySQL Tables                            │
│                                                             │
│  ┌──────────────────────┐    ┌──────────────────────┐      │
│  │  naps_skill_groups   │    │   naps_sub_skills    │      │
│  ├──────────────────────┤    ├──────────────────────┤      │
│  │ id (PK)              │    │ id (PK)              │      │
│  │ name                 │    │ naps_skill_group_id  │──┐   │
│  │ description          │    │ name                 │  │   │
│  │ sort_order           │    │ description          │  │   │
│  │ created_at           │    │ sort_order           │  │   │
│  │ updated_at           │    │ created_at           │  │   │
│  │ deleted_at           │    │ updated_at           │  │   │
│  │                      │    │ deleted_at           │  │   │
│  │ Records: 5           │    │ Records: 65          │  │   │
│  └──────────────────────┘    └──────────────────────┘  │   │
│           ▲                                             │   │
│           └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
User Opens NAPS Survey
       │
       ▼
   Step 1: Employment
   (User selects status)
       │
       ▼
   Step 2: Skills ◄──── Current Focus
   │
   ├─ Component Mounts
   │  └─ useEffect(() => { loadData(); }, [])
   │
   ├─ Fetches Data (Parallel)
   │  ├─ getDashboardStats()
   │  ├─ getStates()
   │  ├─ getOwopSectors()
   │  └─ getSkillGroups() ◄─── NEW
   │
   ├─ Receives 5 Skill Groups with 65 Sub-Skills
   │
   ├─ Renders UI
   │  ├─ Selection Counter (0 selected initially)
   │  ├─ Group 1 (Auto-expanded)
   │  │  ├─ Web Development [   ]
   │  │  ├─ Mobile App Development [   ]
   │  │  └─ ... (17 skills)
   │  ├─ Group 2 (Collapsed)
   │  │  ├─ Fashion Design [   ]
   │  │  └─ ... (14 skills)
   │  ├─ Group 3 (Collapsed)
   │  └─ ... (remaining groups)
   │
   ├─ User Interactions
   │  ├─ Click "Digital & Technology" header
   │  │  └─ toggleGroup(1) ─► expandedGroups = new Set([1])
   │  │
   │  ├─ Click "Web Development" skill
   │  │  └─ toggleSubSkill(1) ─► selectedSkills = [1]
   │  │
   │  ├─ Click "Vocational & Technical" header
   │  │  └─ toggleGroup(2) ─► expandedGroups = new Set([1, 2])
   │  │
   │  └─ Click more skills
   │     └─ selectedSkills = [1, 5, 10, 25, ...]
   │
   └─ User Clicks "Next"
      └─ Submits form with selectedSkills array
         │
         ▼
   Step 3: OWOP Products
```

## Component State Management

```
┌─────────────────────────────────────────────┐
│         React State (Index.tsx)             │
├─────────────────────────────────────────────┤
│                                             │
│  skillGroups: SkillGroup[] = [              │
│    {                                        │
│      id: 1,                                 │
│      name: "Digital & Technology",          │
│      description: "...",                    │
│      sort_order: 1,                         │
│      sub_skills: [                          │
│        {                                    │
│          id: 1,                             │
│          name: "Web Development",           │
│          group_id: 1                        │
│        },                                   │
│        ...                                  │
│      ]                                      │
│    },                                       │
│    ...                                      │
│  ]                                          │
│                                             │
│  expandedGroups: Set<number> = Set([1])     │
│  (Tracks which groups are expanded)         │
│                                             │
│  selectedSkills: number[] = [1, 5, 10]      │
│  (Tracks selected skill IDs)                │
│                                             │
└─────────────────────────────────────────────┘
```

## UI Component Hierarchy

```
Step 2: Skills
├── Description Text
│   "Select all skills you currently possess..."
│
├── Selection Counter Badge (if selectedSkills.length > 0)
│   "✓ 3 skills selected"
│
└── Skill Groups Container
    ├── Skill Group 1 Card
    │   ├── Group Header (clickable)
    │   │   ├── Group Name
    │   │   ├── Skill Count
    │   │   └── Expand/Collapse Icon
    │   │
    │   └── Group Skills Grid (if expanded)
    │       ├── Skill Button 1
    │       ├── Skill Button 2
    │       ├── Skill Button 3
    │       └── ... (all skills in group)
    │
    ├── Skill Group 2 Card (collapsed)
    │   └── Group Header (clickable)
    │
    └── Skill Group 3-5 Cards
        └── ... (same structure)

Fallback (if API fails):
└── Original Skills Grid (6 buttons)
```

## Database Relationships

```
naps_skill_groups (5 records)
    │
    │ One-to-Many
    │
    ▼
naps_sub_skills (65 records)

Example:
Group 1 "Digital & Technology" ──┬─► Skill 1 "Web Development"
                                  ├─► Skill 2 "Mobile App Development"
                                  ├─► Skill 3 "UI/UX Design"
                                  ├─► ... (17 total)
                                  └─► Skill 17 "Photography"

Group 2 "Vocational & Technical" ─┬─► Skill 18 "Fashion Design/Tailoring"
                                   ├─► Skill 19 "Catering/Baking/Pastry"
                                   └─► ... (14 total)
```

## API Request/Response Cycle

```
Frontend
  │
  │ GET /api/naps/skill-groups
  │
  ▼
Backend Controller (NapsApiController::getSkillGroups)
  │
  │ 1. Fetch: NapsSkillGroup::with('subSkills')
  │ 2. Order by: sort_order
  │ 3. Get: ->get()
  │
  ├─► Transform to array
  ├─► Map each group with sub_skills
  └─► Return JSON response
  │
  ▼
Frontend (napsApi.ts)
  │
  │ Response: {
  │   "success": true,
  │   "skill_groups": [...],
  │   "total_skills": 65
  │ }
  │
  ▼
State Update
  │
  ├─ setSkillGroups(data.skill_groups)
  ├─ setExpandedGroups(new Set([first_group_id]))
  └─ Component Re-renders

User sees:
- First group expanded with all 17 skills visible
- Other 4 groups collapsed
- Can click to expand/collapse
- Can select skills
```

## Selection Flow

```
User Clicks Skill Button
        │
        ▼
onClick handler fires
        │
        ▼
toggleSubSkill(skillId) called
        │
        ▼
toggleSkill(skillId) called
        │
        ├─ If skillId in selectedSkills
        │  └─ Remove it: filter(id => id !== skillId)
        │
        └─ If skillId NOT in selectedSkills
           └─ Add it: [...prev, skillId]
        │
        ▼
setSelectedSkills(updated array)
        │
        ▼
React Re-renders Step 2
        │
        ├─ Button color changes (emerald highlight)
        ├─ Selection counter updates
        └─ UI reflects new state

When submitting:
selectedSkills = [1, 5, 10, 25, ...]
     │
     ▼
Survey submission
     │
     ▼
Backend stores as JSON array
in naps_respondents.skills column
```

## Backward Compatibility Flow

```
Component Mounts
       │
       ▼
Try to fetch skill groups
       │
    ┌──┴──┐
    │     │
  Success Failure
    │     │
    │     ▼
    │  Catch error
    │     │
    │     ▼
    │  Log to console
    │     │
    │     └────┐
    │          │
    ▼          ▼
Display Grouped UI  Display Original 6 Skills
(65 skills)         (6 skills)
       │                  │
       └──────┬───────────┘
              │
              ▼
        Survey Still Works
        (Both formats accepted)
        │
        ▼
    Form Submission
    (selectedSkills array)
    │
    └─► Database stores array
        └─► Works with any skill ID
```

---

## Legend

```
[   ] = Skill Button (unselected)
[✓] = Skill Button (selected)
──┬─ = Relationship/Connection
  │
  ▼ = Data Flow Direction
```

This architecture ensures:
- ✅ Scalability (65 skills, easily expandable)
- ✅ Performance (lazy loading with collapsible groups)
- ✅ Backward Compatibility (fallback to 6 skills)
- ✅ User Experience (organized, discoverable skills)
- ✅ Maintainability (clean separation of concerns)
