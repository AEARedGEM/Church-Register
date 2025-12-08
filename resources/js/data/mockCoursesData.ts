export const mockCoursesData = {
  courses: [
    {
      id: 1,
      title: "Full Stack Web Development Bootcamp",
      slug: "full-stack-web-development",
      description: "Master modern web development with React, Node.js, and PostgreSQL. Build 5 real-world projects from scratch.",
      long_description: "This comprehensive bootcamp takes you from beginner to job-ready full stack developer. You'll learn front-end development with React and TypeScript, back-end development with Node.js and Express, database management with PostgreSQL, and deployment strategies with Docker and AWS. The course includes hands-on projects, code reviews, and career preparation.",
      course_category: {
        id: 1,
        name: "Tech Skills",
        slug: "tech-skills"
      },
      skill_type: {
        id: 1,
        name: "Programming",
        slug: "programming"
      },
      instructor: {
        id: 1,
        name: "Dr. Sarah Johnson",
        bio: "Senior Software Engineer at Google with 10+ years experience",
        avatar: "https://i.pravatar.cc/150?img=1",
        rating: 4.9,
        students: 45000,
        courses: 12
      },
      duration_hours: 120,
      duration_minutes: 30,
      difficulty_level: "intermediate",
      price: 299.99,
      effective_price: 199.99,
      discount_percentage: 33,
      enrolled_count: 15420,
      rating: 4.8,
      review_count: 3245,
      is_active: true,
      status: "published",
      language: "English",
      subtitles: ["English", "Spanish", "French"],
      last_updated: "2024-12-15",
      prerequisites: [
        "Basic understanding of HTML and CSS",
        "Familiarity with JavaScript fundamentals",
        "A computer with internet connection"
      ],
      learning_outcomes: [
        "Build full-stack web applications from scratch",
        "Master React hooks and state management",
        "Create RESTful APIs with Node.js and Express",
        "Design and implement PostgreSQL databases",
        "Deploy applications to production environments",
        "Write clean, maintainable, and tested code",
        "Understand modern development workflows and CI/CD"
      ],
      curriculum: {
        total_sections: 12,
        total_lectures: 156,
        sections: [
          {
            id: 1,
            title: "Introduction to Modern Web Development",
            lectures_count: 8,
            duration: "2h 15m",
            lectures: [
              {
                id: 1,
                title: "Course Overview and Setup",
                duration: "15m",
                type: "video",
                is_preview: true,
                is_completed: false
              },
              {
                id: 2,
                title: "Development Environment Setup",
                duration: "20m",
                type: "video",
                is_preview: true,
                is_completed: false
              },
              {
                id: 3,
                title: "Modern JavaScript ES6+ Features",
                duration: "30m",
                type: "video",
                is_preview: false,
                is_completed: false
              },
              {
                id: 4,
                title: "Understanding the Full Stack",
                duration: "25m",
                type: "video",
                is_preview: false,
                is_completed: false
              },
              {
                id: 5,
                title: "Git and Version Control Basics",
                duration: "20m",
                type: "video",
                is_preview: false,
                is_completed: false
              },
              {
                id: 6,
                title: "Introduction to TypeScript",
                duration: "25m",
                type: "video",
                is_preview: false,
                is_completed: false
              }
            ]
          },
          {
            id: 2,
            title: "React Fundamentals",
            lectures_count: 15,
            duration: "5h 30m",
            lectures: [
              {
                id: 7,
                title: "React Basics and JSX",
                duration: "30m",
                type: "video",
                is_preview: false,
                is_completed: false
              },
              {
                id: 8,
                title: "Components and Props",
                duration: "25m",
                type: "video",
                is_preview: false,
                is_completed: false
              },
              {
                id: 9,
                title: "State Management with useState",
                duration: "35m",
                type: "video",
                is_preview: false,
                is_completed: false
              },
              {
                id: 10,
                title: "React Hooks Deep Dive",
                duration: "45m",
                type: "video",
                is_preview: false,
                is_completed: false
              }
            ]
          },
          {
            id: 3,
            title: "Advanced React Patterns",
            lectures_count: 12,
            duration: "4h 45m",
            lectures: []
          },
          {
            id: 4,
            title: "Node.js and Express Backend",
            lectures_count: 18,
            duration: "6h 20m",
            lectures: []
          },
          {
            id: 5,
            title: "Database Design with PostgreSQL",
            lectures_count: 14,
            duration: "5h 10m",
            lectures: []
          },
          {
            id: 6,
            title: "Authentication and Authorization",
            lectures_count: 10,
            duration: "3h 45m",
            lectures: []
          },
          {
            id: 7,
            title: "RESTful API Development",
            lectures_count: 16,
            duration: "5h 50m",
            lectures: []
          },
          {
            id: 8,
            title: "Testing and Quality Assurance",
            lectures_count: 12,
            duration: "4h 15m",
            lectures: []
          },
          {
            id: 9,
            title: "Project 1: E-commerce Platform",
            lectures_count: 20,
            duration: "8h 30m",
            lectures: []
          },
          {
            id: 10,
            title: "Deployment and DevOps",
            lectures_count: 11,
            duration: "4h 20m",
            lectures: []
          },
          {
            id: 11,
            title: "Project 2: Social Media Application",
            lectures_count: 15,
            duration: "6h 45m",
            lectures: []
          },
          {
            id: 12,
            title: "Career Preparation and Next Steps",
            lectures_count: 5,
            duration: "2h 10m",
            lectures: []
          }
        ]
      },
      includes: [
        "120+ hours of on-demand video",
        "5 real-world projects",
        "Downloadable resources and code",
        "Certificate of completion",
        "Lifetime access",
        "Access on mobile and desktop",
        "Private student community"
      ],
      requirements: [
        "A computer (Windows, Mac, or Linux)",
        "Basic programming knowledge is helpful but not required",
        "Willingness to learn and practice"
      ],
      target_audience: [
        "Aspiring web developers",
        "Career changers entering tech",
        "Developers wanting to update their skills",
        "Computer science students"
      ],
      tags: ["react", "nodejs", "postgresql", "fullstack", "javascript", "typescript", "web-development"],
      thumbnail_url: "https://picsum.photos/seed/course1/800/450",
      preview_video_url: "https://example.com/preview1.mp4",
      certificates: {
        enabled: true,
        blockchain_verified: true
      }
    },
    {
      id: 2,
      title: "Data Science with Python",
      slug: "data-science-python",
      description: "Learn data analysis, visualization, and machine learning with Python, NumPy, Pandas, and Scikit-learn.",
      long_description: "Become a data scientist by mastering Python's data science stack. This course covers everything from data cleaning and exploration to advanced machine learning algorithms. You'll work with real datasets and build a portfolio of data science projects.",
      course_category: {
        id: 1,
        name: "Tech Skills",
        slug: "tech-skills"
      },
      skill_type: {
        id: 2,
        name: "Data Science",
        slug: "data-science"
      },
      instructor: {
        id: 2,
        name: "Prof. Michael Chen",
        bio: "Data Science Lead at Microsoft, PhD in Machine Learning",
        avatar: "https://i.pravatar.cc/150?img=2",
        rating: 4.9,
        students: 32000,
        courses: 8
      },
      duration_hours: 85,
      duration_minutes: 45,
      difficulty_level: "intermediate",
      price: 249.99,
      effective_price: 149.99,
      discount_percentage: 40,
      enrolled_count: 12350,
      rating: 4.7,
      review_count: 2876,
      is_active: true,
      status: "published",
      language: "English",
      subtitles: ["English", "Mandarin", "Hindi"],
      last_updated: "2025-01-10",
      prerequisites: [
        "Basic Python programming knowledge",
        "High school mathematics",
        "Familiarity with basic statistics"
      ],
      learning_outcomes: [
        "Perform data analysis with Pandas",
        "Create data visualizations with Matplotlib and Seaborn",
        "Build machine learning models",
        "Handle big data with efficient techniques",
        "Apply statistical analysis to real problems",
        "Deploy machine learning models to production"
      ],
      curriculum: {
        total_sections: 10,
        total_lectures: 124,
        sections: [
          {
            id: 1,
            title: "Python for Data Science",
            lectures_count: 10,
            duration: "3h 20m",
            lectures: []
          },
          {
            id: 2,
            title: "NumPy Fundamentals",
            lectures_count: 12,
            duration: "4h 15m",
            lectures: []
          },
          {
            id: 3,
            title: "Data Manipulation with Pandas",
            lectures_count: 15,
            duration: "5h 30m",
            lectures: []
          },
          {
            id: 4,
            title: "Data Visualization",
            lectures_count: 14,
            duration: "4h 45m",
            lectures: []
          },
          {
            id: 5,
            title: "Statistical Analysis",
            lectures_count: 11,
            duration: "3h 50m",
            lectures: []
          },
          {
            id: 6,
            title: "Machine Learning Basics",
            lectures_count: 18,
            duration: "6h 40m",
            lectures: []
          },
          {
            id: 7,
            title: "Supervised Learning Algorithms",
            lectures_count: 16,
            duration: "5h 55m",
            lectures: []
          },
          {
            id: 8,
            title: "Unsupervised Learning",
            lectures_count: 12,
            duration: "4h 20m",
            lectures: []
          },
          {
            id: 9,
            title: "Real-World Projects",
            lectures_count: 12,
            duration: "5h 10m",
            lectures: []
          },
          {
            id: 10,
            title: "Model Deployment",
            lectures_count: 4,
            duration: "2h 00m",
            lectures: []
          }
        ]
      },
      includes: [
        "85+ hours of video content",
        "10 hands-on projects",
        "Jupyter notebooks",
        "Dataset collection",
        "Certificate of completion",
        "Career guidance"
      ],
      requirements: [
        "Python basics",
        "Basic mathematics",
        "Computer with 8GB+ RAM"
      ],
      target_audience: [
        "Aspiring data scientists",
        "Analysts wanting to learn Python",
        "Developers moving into data science",
        "Students pursuing data science careers"
      ],
      tags: ["python", "data-science", "machine-learning", "pandas", "numpy", "scikit-learn"],
      thumbnail_url: "https://picsum.photos/seed/course2/800/450",
      preview_video_url: "https://example.com/preview2.mp4",
      certificates: {
        enabled: true,
        blockchain_verified: true
      }
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      slug: "ui-ux-design-masterclass",
      description: "Master user interface and experience design with Figma. Learn design principles, user research, and prototyping.",
      long_description: "Transform your creative ideas into stunning user experiences. This comprehensive course teaches you the complete UI/UX design process from research to final handoff. You'll master Figma, conduct user research, create wireframes and prototypes, and build a professional portfolio.",
      course_category: {
        id: 2,
        name: "Soft Skills",
        slug: "soft-skills"
      },
      skill_type: {
        id: 3,
        name: "Design",
        slug: "design"
      },
      instructor: {
        id: 3,
        name: "Emma Rodriguez",
        bio: "Lead Product Designer at Airbnb, 8 years experience",
        avatar: "https://i.pravatar.cc/150?img=3",
        rating: 4.9,
        students: 28500,
        courses: 6
      },
      duration_hours: 65,
      duration_minutes: 20,
      difficulty_level: "beginner",
      price: 199.99,
      effective_price: 99.99,
      discount_percentage: 50,
      enrolled_count: 18920,
      rating: 4.9,
      review_count: 4123,
      is_active: true,
      status: "published",
      language: "English",
      subtitles: ["English", "Spanish", "Portuguese"],
      last_updated: "2025-01-20",
      prerequisites: [
        "No design experience required",
        "Creative mindset",
        "Access to a computer"
      ],
      learning_outcomes: [
        "Master Figma for UI design",
        "Conduct user research and testing",
        "Create wireframes and mockups",
        "Build interactive prototypes",
        "Understand design systems",
        "Apply design thinking methodology",
        "Create a professional portfolio"
      ],
      curriculum: {
        total_sections: 9,
        total_lectures: 98,
        sections: [
          {
            id: 1,
            title: "Introduction to UI/UX Design",
            lectures_count: 8,
            duration: "2h 30m",
            lectures: []
          },
          {
            id: 2,
            title: "Figma Fundamentals",
            lectures_count: 12,
            duration: "4h 15m",
            lectures: []
          },
          {
            id: 3,
            title: "User Research Methods",
            lectures_count: 10,
            duration: "3h 45m",
            lectures: []
          },
          {
            id: 4,
            title: "Wireframing and Information Architecture",
            lectures_count: 11,
            duration: "4h 20m",
            lectures: []
          },
          {
            id: 5,
            title: "Visual Design Principles",
            lectures_count: 14,
            duration: "5h 10m",
            lectures: []
          },
          {
            id: 6,
            title: "Prototyping and Interaction Design",
            lectures_count: 13,
            duration: "4h 50m",
            lectures: []
          },
          {
            id: 7,
            title: "Design Systems and Components",
            lectures_count: 10,
            duration: "3h 40m",
            lectures: []
          },
          {
            id: 8,
            title: "Portfolio Projects",
            lectures_count: 15,
            duration: "6h 30m",
            lectures: []
          },
          {
            id: 9,
            title: "Career Development for Designers",
            lectures_count: 5,
            duration: "1h 50m",
            lectures: []
          }
        ]
      },
      includes: [
        "65+ hours of video",
        "Figma design files",
        "Design templates and resources",
        "Portfolio review",
        "Certificate of completion",
        "Job application guidance"
      ],
      requirements: [
        "Computer with internet connection",
        "Free Figma account",
        "Willingness to learn and practice"
      ],
      target_audience: [
        "Aspiring UI/UX designers",
        "Graphic designers expanding skills",
        "Product managers learning design",
        "Developers interested in design"
      ],
      tags: ["ui-design", "ux-design", "figma", "design-thinking", "prototyping", "user-research"],
      thumbnail_url: "https://picsum.photos/seed/course3/800/450",
      preview_video_url: "https://example.com/preview3.mp4",
      certificates: {
        enabled: true,
        blockchain_verified: true
      }
    }
  ],
  reviews: [
    {
      id: 1,
      course_id: 1,
      user: {
        id: 101,
        name: "John Smith",
        avatar: "https://i.pravatar.cc/150?img=11"
      },
      rating: 5,
      title: "Excellent course for full stack development!",
      comment: "This course exceeded my expectations. The instructor explains complex topics clearly and the projects are very practical. I landed a job as a full stack developer 2 months after completing this course!",
      helpful_count: 245,
      created_at: "2025-01-15",
      is_verified_purchase: true
    },
    {
      id: 2,
      course_id: 1,
      user: {
        id: 102,
        name: "Maria Garcia",
        avatar: "https://i.pravatar.cc/150?img=12"
      },
      rating: 4,
      title: "Great content, challenging projects",
      comment: "The course content is comprehensive and up-to-date. The projects are challenging but rewarding. Would love more advanced topics on deployment and scaling.",
      helpful_count: 189,
      created_at: "2025-01-10",
      is_verified_purchase: true
    },
    {
      id: 3,
      course_id: 1,
      user: {
        id: 103,
        name: "Ahmed Hassan",
        avatar: "https://i.pravatar.cc/150?img=13"
      },
      rating: 5,
      title: "Best investment in my career",
      comment: "I've taken several bootcamps and this is by far the best. The instructor is knowledgeable and the curriculum is well-structured. The community support is also amazing.",
      helpful_count: 312,
      created_at: "2025-01-05",
      is_verified_purchase: true
    }
  ]
};
