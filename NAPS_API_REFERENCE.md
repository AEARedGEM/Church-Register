# NAPS API Response Examples

## 1. Dashboard Statistics with Charts

### Endpoint
```
GET /api/naps/dashboard-stats
```

### Response Example

```json
{
  "success": true,
  "stats": {
    "totalRespondents": 125,
    "surveysCompleted": 98,
    "verifiedUsers": 87,
    "statesReached": 36
  },
  "charts": {
    "employmentData": [
      {
        "name": "Employed",
        "value": 45
      },
      {
        "name": "Self Employed",
        "value": 32
      },
      {
        "name": "Unemployed",
        "value": 28
      },
      {
        "name": "Student",
        "value": 20
      }
    ],
    "skillsData": [
      {
        "name": "Web Development",
        "count": 18
      },
      {
        "name": "Carpentry",
        "count": 15
      },
      {
        "name": "Graphic Design",
        "count": 12
      },
      {
        "name": "Welding",
        "count": 11
      },
      {
        "name": "Catering",
        "count": 9
      },
      {
        "name": "Fashion Design",
        "count": 8
      }
    ],
    "productsData": [
      {
        "name": "Cassava farming",
        "value": 24
      },
      {
        "name": "Software development",
        "value": 19
      },
      {
        "name": "Tailoring/fashion design",
        "value": 16
      },
      {
        "name": "Web Development",
        "value": 14
      },
      {
        "name": "Furniture & carpentry",
        "value": 12
      },
      {
        "name": "Rice cultivation",
        "value": 11
      },
      {
        "name": "Poultry",
        "value": 10
      },
      {
        "name": "Welding and fabrication",
        "value": 9
      },
      {
        "name": "Graphics & branding",
        "value": 8
      },
      {
        "name": "Goat/Sheep rearing",
        "value": 7
      }
    ],
    "fundingData": [
      {
        "name": "TradeFi Funding",
        "value": 52
      },
      {
        "name": "Equity Funding",
        "value": 38
      },
      {
        "name": "Tokenization",
        "value": 28
      },
      {
        "name": "Traditional Loan",
        "value": 18
      }
    ],
    "stateData": [
      {
        "state": "Lagos",
        "respondents": 28
      },
      {
        "state": "Oyo",
        "respondents": 18
      },
      {
        "state": "Enugu",
        "respondents": 15
      },
      {
        "state": "Anambra",
        "respondents": 12
      },
      {
        "state": "Rivers",
        "respondents": 11
      }
    ]
  }
}
```

---

## 2. Get All OWOP Sectors

### Endpoint
```
GET /api/naps/sectors
```

### Response Example

```json
{
  "success": true,
  "sectors": {
    "1": {
      "id": 1,
      "name": "Agriculture & Agribusiness",
      "description": "Farming and agricultural value-added products",
      "icon": "🌾",
      "products": [
        "Cassava farming",
        "Maize farming",
        "Rice cultivation",
        "Sorghum/millet",
        "Palm oil",
        "Cocoa",
        "Shea nut",
        "Vegetables",
        "Poultry",
        "Fishery/Aquaculture",
        "Goat/Sheep rearing",
        "Cattle",
        "Beekeeping",
        "Snail farming",
        "Horticulture / flowers"
      ]
    },
    "2": {
      "id": 2,
      "name": "Food Processing & FMCG",
      "description": "Food production and consumer goods manufacturing",
      "icon": "🍽️",
      "products": [
        "Garri processing",
        "Cassava flour",
        "Yam flour",
        "Rice milling",
        "Vegetable oil extraction",
        "Palm kernel processing",
        "Poultry feed production",
        "Bottled water production",
        "Bakery products",
        "Noodles & snacks",
        "Fruit juice processing",
        "Spice/seasoning production"
      ]
    },
    "9": {
      "id": 9,
      "name": "Digital Economy & ICT",
      "description": "Digital services and information technology",
      "icon": "💻",
      "products": [
        "Software development",
        "Freelancing/remote work",
        "IT device repair",
        "Data processing centers",
        "Digital marketing",
        "Cybersecurity services",
        "Animation & 3D design",
        "Mobile phone assembly",
        "E-learning & edtech services"
      ]
    }
  }
}
```

---

## 3. Get Products for Specific Sector

### Endpoint
```
GET /api/naps/sectors/1/products
```

### Response Example

```json
{
  "success": true,
  "sector": {
    "id": 1,
    "name": "Agriculture & Agribusiness",
    "description": "Farming and agricultural value-added products",
    "icon": "🌾"
  },
  "products": [
    "Cassava farming",
    "Maize farming",
    "Rice cultivation",
    "Sorghum/millet",
    "Palm oil",
    "Cocoa",
    "Shea nut",
    "Vegetables",
    "Poultry",
    "Fishery/Aquaculture",
    "Goat/Sheep rearing",
    "Cattle",
    "Beekeeping",
    "Snail farming",
    "Horticulture / flowers"
  ]
}
```

---

## 4. Get Ward OWOP Priorities

### Endpoint
```
GET /api/naps/ward-priorities/Lagos/Ikeja/Ikeja%20West
```

### Response Example - With Data

```json
{
  "success": true,
  "ward": "Ikeja West, Ikeja, Lagos",
  "priorities": [
    {
      "name": "Software development",
      "sector": "Digital Economy & ICT",
      "sector_id": 9,
      "score": 87.5,
      "population_interest": 18
    },
    {
      "name": "Web Development",
      "sector": "Digital Economy & ICT",
      "sector_id": 9,
      "score": 85.2,
      "population_interest": 16
    },
    {
      "name": "Graphics & branding",
      "sector": "Creative Economy & Entertainment",
      "sector_id": 10,
      "score": 78.9,
      "population_interest": 12
    }
  ],
  "summary": {
    "total_respondents": 45,
    "products_voted": 23,
    "recommendation": "Based on 45 respondents, we recommend Software development, Web Development, Graphics & branding"
  }
}
```

### Response Example - No Data Yet

```json
{
  "success": true,
  "message": "No respondent data yet for this ward",
  "priorities": [],
  "summary": {
    "total_respondents": 0,
    "products_voted": 0
  }
}
```

---

## 5. Submit Survey

### Endpoint
```
POST /api/naps/submit-survey
```

### Request Body

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+2348012345678",
  "state": "Lagos",
  "lga": "Ikeja",
  "ward": "Ikeja West",
  "employment_status": "self_employed",
  "selected_skills": [1, 5],
  "selected_product": "Software development",
  "secondary_product": "Graphics & branding",
  "funding_needs": ["TradeFi Funding", "Equity Funding"],
  "governance_rating": 4
}
```

### Response Success

```json
{
  "success": true,
  "message": "Survey submitted successfully",
  "respondent_id": 125
}
```

### Response Error

```json
{
  "success": false,
  "errors": {
    "phone": ["The phone field is required."],
    "state": ["The state field is required."]
  }
}
```

---

## 6. Get Respondents List

### Endpoint
```
GET /api/naps/respondents?state=Lagos&employment_status=self_employed&page=1
```

### Response Example

```json
{
  "success": true,
  "respondents": {
    "data": [
      {
        "id": 125,
        "user_id": 45,
        "first_name": "John",
        "last_name": "Doe",
        "phone": "+2348012345678",
        "state": "Lagos",
        "lga": "Ikeja",
        "ward": "Ikeja West",
        "employment_status": "self_employed",
        "skills": [1, 5],
        "products_interest": ["Software development", "Graphics & branding"],
        "funding_needs": ["TradeFi Funding", "Equity Funding"],
        "governance_rating": 4,
        "survey_completed_at": "2025-12-08 14:30:00",
        "created_at": "2025-12-08 14:30:00",
        "user": {
          "id": 45,
          "name": "John Doe",
          "email": "john@example.com",
          "verified_at": "2025-12-01"
        }
      }
    ],
    "links": {
      "first": "http://localhost/api/naps/respondents?page=1",
      "last": "http://localhost/api/naps/respondents?page=10",
      "prev": null,
      "next": "http://localhost/api/naps/respondents?page=2"
    },
    "meta": {
      "current_page": 1,
      "from": 1,
      "last_page": 10,
      "per_page": 20,
      "to": 20,
      "total": 200
    }
  }
}
```

---

## 7. Error Responses

### 404 Not Found - Sector Not Found

```json
{
  "success": false,
  "message": "Sector not found"
}
```

### 500 Server Error

```json
{
  "success": false,
  "message": "Failed to fetch statistics",
  "error": "Exception message",
  "stats": {
    "totalRespondents": 0,
    "surveysCompleted": 0,
    "verifiedUsers": 0,
    "statesReached": 0
  },
  "charts": {
    "employmentData": [],
    "skillsData": [],
    "productsData": [],
    "fundingData": [],
    "stateData": []
  }
}
```

---

## API Request Headers

All requests should include:
```
Content-Type: application/json
Accept: application/json
```

For authenticated endpoints, also include:
```
Authorization: Bearer {JWT_TOKEN}
```

---

## Data Type Reference

| Field | Type | Example |
|-------|------|---------|
| respondents/count | integer | 45 |
| score | float | 87.5 |
| products_interest | array | ["Product A", "Product B"] |
| funding_needs | array | ["TradeFi", "Equity"] |
| skills | array of integers | [1, 3, 5] |
| employment_status | string | "self_employed" |
| governance_rating | integer (1-5) | 4 |

---

## Common HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource doesn't exist |
| 422 | Unprocessable Entity - Validation failed |
| 500 | Server Error - Something went wrong |

---

## Rate Limiting

Currently no rate limiting implemented. Can be added as needed.

## Caching

Dashboard stats endpoint response is cached for performance:
- Default cache duration: 5 minutes
- Cache key: `naps_dashboard_stats`
- Clear cache: `php artisan cache:clear`

---

## Testing with cURL

```bash
# Get all sectors
curl http://localhost/api/naps/sectors

# Get sector 1 products
curl http://localhost/api/naps/sectors/1/products

# Get dashboard stats
curl http://localhost/api/naps/dashboard-stats

# Get ward priorities (with auth token)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost/api/naps/ward-priorities/Lagos/Ikeja/Ikeja

# Submit survey (with auth token)
curl -X POST http://localhost/api/naps/submit-survey \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    ...
  }'
```

---

**Last Updated:** December 8, 2025  
**API Version:** 1.0  
**Status:** ✅ Ready for Production
