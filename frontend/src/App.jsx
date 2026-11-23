import { useEffect, useState } from 'react'


import './App.css'


const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'



const skillResources = {

  python: {

    description: 'Learn Python syntax, functions, OOP and practical programming.',

    resource: 'Python Official Tutorial',

    url: 'https://docs.python.org/3/tutorial/'

  },

  java: {

    description: 'Study Java fundamentals, OOP and collections.',

    resource: 'Dev.java Tutorials',

    url: 'https://dev.java/learn/'

  },

  javascript: {

    description: 'Practise ES6+, functions, promises and asynchronous programming.',

    resource: 'MDN JavaScript Guide',

    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide'

  },

  react: {

    description: 'Learn components, props, state, hooks and API integration.',

    resource: 'React Official Documentation',

    url: 'https://react.dev/learn'

  },

  html: {

    description: 'Learn semantic HTML and accessible page structure.',

    resource: 'MDN HTML Guide',

    url: 'https://developer.mozilla.org/en-US/docs/Web/HTML'

  },

  css: {

    description: 'Practise layouts, Flexbox, Grid and responsive design.',

    resource: 'MDN CSS Guide',

    url: 'https://developer.mozilla.org/en-US/docs/Web/CSS'

  },

  fastapi: {

    description: 'Build REST APIs, validation and backend applications.',

    resource: 'FastAPI Official Tutorial',

    url: 'https://fastapi.tiangolo.com/tutorial/'

  },

  postgresql: {

    description: 'Practise SQL queries, joins, tables and database design.',

    resource: 'PostgreSQL Tutorial',

    url: 'https://www.postgresql.org/docs/current/tutorial.html'

  },

  mysql: {

    description: 'Learn relational databases and SQL operations.',

    resource: 'MySQL Official Tutorial',

    url: 'https://dev.mysql.com/doc/'

  },

  mongodb: {

    description: 'Understand document databases and CRUD operations.',

    resource: 'MongoDB University',

    url: 'https://learn.mongodb.com/'

  },

  git: {

    description: 'Learn version control, commits, branches and merging.',

    resource: 'Git Official Documentation',

    url: 'https://git-scm.com/doc'

  },

  'scikit-learn': {

    description: 'Practise machine learning models and evaluation.',

    resource: 'Scikit-learn Tutorials',

    url: 'https://scikit-learn.org/stable/tutorial/'

  },

  'data structures': {

    description: 'Study arrays, linked lists, stacks, queues, trees and graphs.',

    resource: 'GeeksforGeeks Data Structures',

    url: 'https://www.geeksforgeeks.org/data-structures/'

  },

  'machine learning': {

    description: 'Learn supervised learning, unsupervised learning and model evaluation.',

    resource: 'Google Machine Learning Crash Course',

    url: 'https://developers.google.com/machine-learning/crash-course'

  },

  nlp: {

    description: 'Learn text processing, tokenization, embeddings and language models.',

    resource: 'Hugging Face NLP Course',

    url: 'https://huggingface.co/learn/nlp-course'

  },

  'node.js': {

    description: 'Learn server-side JavaScript, modules and asynchronous programming.',

    resource: 'Node.js Official Learn',

    url: 'https://nodejs.org/en/learn'

  },

  'c++': {

    description: 'Practise C++ syntax, OOP, STL and memory management.',

    resource: 'LearnCpp',

    url: 'https://www.learncpp.com/'

  },

  c: {

    description: 'Learn C fundamentals, pointers, arrays and memory management.',

    resource: 'Learn C',

    url: 'https://www.learn-c.org/'

  }

}



function SkillGapRecommendations({ missingSkills = [] }) {

  const recommendations = missingSkills.map(skill => {

    const resource = skillResources[skill.toLowerCase()]



    return {

      skill,

      description: resource?.description ||

        `Build practical knowledge and complete a small project using ${skill}.`,

      resource: resource?.resource || `Find ${skill} learning resources`,

      url: resource?.url ||

        `https://www.google.com/search?q=${encodeURIComponent(skill + ' official documentation')}`

    }

  })



  return (

    <div className="panel" style={{ marginTop: '24px' }}>

      <h3>Skill Gap Recommendations</h3>

      <p className="panel-description">

        Learning suggestions based on the skills missing from your resume.

      </p>



      {recommendations.length === 0 ? (

        <div>

          <strong>All identified required skills are covered!</strong>

          <p>

            Continue strengthening your practical experience through

            projects and real-world applications.

          </p>

        </div>

      ) : (

        <>

          <div className="skill-panels">

            {recommendations.map((item, index) => (

              <div className="panel" key={item.skill}>

                <h3>{index + 1}. {item.skill}</h3>

                <p>{item.description}</p>

                <a

                  href={item.url}

                  target="_blank"

                  rel="noopener noreferrer"

                >

                  {item.resource} →

                </a>

              </div>

            ))}

          </div>



          <h3 style={{ marginTop: '24px' }}>

            Suggested Learning Roadmap

          </h3>



          <ol>

            <li>

              <strong>Learn:</strong> Study the fundamentals of each

              missing skill.

            </li>

            <li>

              <strong>Practise:</strong> Complete coding exercises

              and practical examples.

            </li>

            <li>

              <strong>Build:</strong> Create a small project using

              the newly learned skills.

            </li>

            <li>

              <strong>Update:</strong> Add genuine project experience

              and demonstrated skills to your resume.

            </li>

          </ol>

        </>

      )}

    </div>

  )

}



function ResumeImprovementSuggestions({ analysis }) {
  const missingSkills = analysis?.missing_skills || []
  const matchScore = Number(analysis?.match_score ?? 0)
  const textSimilarity = Number(analysis?.text_similarity ?? 0)
  const skillCoverage = Number(analysis?.skill_coverage ?? 0)

  const suggestions = []

  if (missingSkills.length > 0) {
    suggestions.push({
      title: 'Address the missing job skills',
      priority: 'High',
      detail: `The analysis identified ${missingSkills.length} required skill(s) that were not matched: ${missingSkills.join(', ')}. If you genuinely have experience with any of them, make that experience easier to find in the relevant skills, project or experience section. Do not add skills you cannot demonstrate.`
    })
  } else {
    suggestions.push({
      title: 'Show evidence for your matched skills',
      priority: 'High',
      detail: 'The analysis matched the identified required skills. Strengthen those matches by showing where you used each skill in a project, internship or work experience rather than listing technologies alone.'
    })
  }

  if (textSimilarity < 30) {
    suggestions.push({
      title: 'Make the resume more relevant to this job',
      priority: 'High',
      detail: 'The text similarity score is relatively low. Review the job description and, where accurate, use its relevant terminology in your summary, project descriptions and experience bullets. Avoid copying the job description or adding unrelated keywords.'
    })
  } else {
    suggestions.push({
      title: 'Keep relevant job terminology visible',
      priority: 'Medium',
      detail: 'Your text similarity result provides a useful baseline. Keep the most relevant technologies, responsibilities and domain terms visible in sections where you have supporting experience.'
    })
  }

  if (skillCoverage < 70) {
    suggestions.push({
      title: 'Improve coverage of required skills',
      priority: 'High',
      detail: `Your skill coverage is ${skillCoverage}%. Check each required skill against your actual experience. Add concrete examples for skills you already possess, and build practical experience for genuine gaps.`
    })
  } else {
    suggestions.push({
      title: 'Support your skill list with examples',
      priority: 'Medium',
      detail: `Your skill coverage is ${skillCoverage}%. Preserve this alignment by connecting important skills to specific projects, tasks or outcomes in your resume.`
    })
  }

  if (matchScore < 60) {
    suggestions.push({
      title: 'Rewrite project and experience bullets',
      priority: 'High',
      detail: 'Your overall match score is below 60%. For each relevant project or role, explain the problem, what you personally built or improved, the tools you used and the result. Put the most relevant examples first.'
    })
  } else {
    suggestions.push({
      title: 'Make your strongest achievements easy to scan',
      priority: 'Medium',
      detail: 'Keep the strongest job-relevant projects and achievements near the top. Use concise bullet points that describe your contribution and the outcome.'
    })
  }

  const generalChecks = [
    'Write a short professional summary tailored to the role and supported by your actual experience.',
    'Where possible, quantify outcomes with truthful numbers such as response time, users, accuracy, task volume or time saved.',
    'For each important project, include its purpose, your contribution, technology stack and a result or demonstration.',
    'Use clear section headings, consistent dates and simple formatting that applicant-tracking systems can read.',
    'Check spelling, grammar, links, contact details and consistency before submitting the resume.'
  ]

  return (
    <div className="panel" style={{ marginTop: '24px' }}>
      <h3>Resume Improvement Suggestions</h3>
      <p className="panel-description">
        Practical recommendations based on this analysis. These are rule-based suggestions, not an AI review of every sentence in your document.
      </p>

      <div className="skill-panels">
        {suggestions.map((item, index) => (
          <div className="panel" key={item.title}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
              <h3>{index + 1}. {item.title}</h3>
              <span className="ai-badge">{item.priority} priority</span>
            </div>
            <p>{item.detail}</p>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: '24px' }}>Final Resume Checklist</h3>
      <ul>
        {generalChecks.map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  )
}

function AnalyticsChart({ scores }) {

  const width = 700

  const height = 280

  const padding = 45



  const metrics = [

    { key: 'match_score', label: 'Match Score', color: '#7057e8' },

    { key: 'text_similarity', label: 'Text Similarity', color: '#16a6a1' },

    { key: 'skill_coverage', label: 'Skill Coverage', color: '#e69a35' }

  ]



  const x = index =>

    scores.length === 1

      ? width / 2

      : padding + index * (width - 2 * padding) / (scores.length - 1)



  const y = value =>

    height - padding - (value / 100) * (height - 2 * padding)



  return (

    <div className="panel">

      <h3>Performance Trends</h3>

      <p className="panel-description">

        Historical analysis scores from your database.

      </p>



      {scores.length === 0 ? (

        <p>No analysis records available yet.</p>

      ) : (

        <>

          <div style={{ overflowX: 'auto' }}>

            <svg

              viewBox={`0 0 ${width} ${height}`}

              style={{ width: '100%', minWidth: '350px' }}

              role="img"

              aria-label="Historical resume analysis scores"

            >

              {[0, 25, 50, 75, 100].map(value => (

                <g key={value}>

                  <line

                    x1={padding}

                    y1={y(value)}

                    x2={width - padding}

                    y2={y(value)}

                    stroke="#e5e7eb"

                    strokeDasharray="4 4"

                  />

                  <text

                    x={padding - 10}

                    y={y(value) + 4}

                    textAnchor="end"

                    fill="#888"

                    fontSize="11"

                  >

                    {value}%

                  </text>

                </g>

              ))}



              {metrics.map(metric => (

                <g key={metric.key}>

                  <polyline

                    points={scores.map((item, index) =>

                      `${x(index)},${y(item[metric.key])}`

                    ).join(' ')}

                    fill="none"

                    stroke={metric.color}

                    strokeWidth="3"

                    strokeLinecap="round"

                    strokeLinejoin="round"

                  />



                  {scores.map((item, index) => (

                    <circle

                      key={item.analysis_id}

                      cx={x(index)}

                      cy={y(item[metric.key])}

                      r="5"

                      fill={metric.color}

                    >

                      <title>

                        {metric.label}: {item[metric.key]}%

                      </title>

                    </circle>

                  ))}

                </g>

              ))}



              {scores.map((item, index) => (

                <text

                  key={item.analysis_id}

                  x={x(index)}

                  y={height - 12}

                  textAnchor="middle"

                  fill="#888"

                  fontSize="11"

                >

                  #{item.analysis_id}

                </text>

              ))}

            </svg>

          </div>



          <div style={{

            display: 'flex',

            flexWrap: 'wrap',

            gap: '20px',

            marginTop: '15px'

          }}>

            {metrics.map(metric => (

              <span

                key={metric.key}

                style={{

                  color: metric.color,

                  fontWeight: 600,

                  fontSize: '13px'

                }}

              >

                ● {metric.label}

              </span>

            ))}

          </div>

        </>

      )}

    </div>

  )

}



function App() {

  const [file, setFile] = useState(null)

  const [jobDescription, setJobDescription] = useState('')

  const [loading, setLoading] = useState(false)

  const [result, setResult] = useState(null)

  const [error, setError] = useState('')



  const [activePage, setActivePage] = useState('Dashboard')



  const [stats, setStats] = useState(null)

  const [statsLoading, setStatsLoading] = useState(false)

  const [statsError, setStatsError] = useState('')



  const [history, setHistory] = useState([])

  const [historyLoading, setHistoryLoading] = useState(false)

  const [historyError, setHistoryError] = useState('')



  const [selectedResume, setSelectedResume] = useState(null)

  const [detailsLoading, setDetailsLoading] = useState(false)



  const [analytics, setAnalytics] = useState(null)

  const [analyticsLoading, setAnalyticsLoading] = useState(false)

  const [analyticsError, setAnalyticsError] = useState('')



  const loadStats = async () => {

    setStatsLoading(true)

    setStatsError('')



    try {

      const response = await fetch(`${API}/history/stats`)

      const data = await response.json()



      if (!response.ok) {

        throw new Error(data.detail || 'Could not load statistics')

      }



      setStats(data)

    } catch (err) {

      setStatsError(err.message || 'Unable to connect to backend')

    } finally {

      setStatsLoading(false)

    }

  }



  useEffect(() => {

    loadStats()

  }, [])



  const loadHistory = async () => {

    setActivePage('History')

    setSelectedResume(null)

    setHistoryLoading(true)

    setHistoryError('')



    try {

      const response = await fetch(`${API}/history/resumes`)

      const data = await response.json()



      if (!response.ok) {

        throw new Error(data.detail || 'Could not load resume history')

      }



      setHistory(data.resumes || [])

    } catch (err) {

      setHistoryError(err.message || 'Unable to connect to backend')

    } finally {

      setHistoryLoading(false)

    }

  }



  const loadResumeDetails = async resumeId => {

    setDetailsLoading(true)

    setHistoryError('')

    setSelectedResume(null)



    try {

      const response = await fetch(

        `${API}/history/resumes/${resumeId}`

      )



      const data = await response.json()



      if (!response.ok) {

        throw new Error(data.detail || 'Could not load resume details')

      }



      setSelectedResume(data)

    } catch (err) {

      setHistoryError(err.message || 'Unable to load resume details')

    } finally {

      setDetailsLoading(false)

    }

  }



  const loadAnalytics = async () => {

    setActivePage('Analytics')

    setSelectedResume(null)

    setAnalyticsLoading(true)

    setAnalyticsError('')



    try {

      const response = await fetch(`${API}/history/analytics`)

      const data = await response.json()



      if (!response.ok) {

        throw new Error(data.detail || 'Could not load analytics')

      }



      setAnalytics(data)

    } catch (err) {

      setAnalyticsError(err.message || 'Unable to load analytics')

    } finally {

      setAnalyticsLoading(false)

    }

  }



  const downloadPdfReport = async () => {

    if (!result?.analysis) return
    const analysis = result.analysis
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF()



    const margin = 20

    const pageWidth = doc.internal.pageSize.getWidth()

    const pageHeight = doc.internal.pageSize.getHeight()

    const contentWidth = pageWidth - margin * 2

    let y = 20



    const addText = (text, options = {}) => {

      const { size = 11, bold = false, gap = 7 } = options



      doc.setFont('helvetica', bold ? 'bold' : 'normal')

      doc.setFontSize(size)



      const lines = doc.splitTextToSize(

        String(text ?? ''),

        contentWidth

      )



      const requiredHeight = lines.length * 6 + gap



      if (y + requiredHeight > pageHeight - margin) {

        doc.addPage()

        y = 20

      }



      doc.text(lines, margin, y)

      y += requiredHeight

    }



    const addSection = (heading, items) => {

      addText(heading, { size: 14, bold: true, gap: 5 })



      if (!items || items.length === 0) {

        addText('None')

        return

      }



      addText(items.join(', '), { size: 10 })

    }



    doc.setFont('helvetica', 'bold')

    doc.setFontSize(22)

    doc.text('RESUMIND', margin, y)

    y += 10



    addText('Resume Analysis Report', { size: 16, bold: true })

    addText(`Resume: ${result.filename}`)

    addText(`Generated: ${new Date().toLocaleString()}`)



    addText('MATCHING PERFORMANCE', { size: 14, bold: true })

    addText(`Overall Match Score: ${analysis.match_score}%`, {

      size: 12,

      bold: true

    })

    addText(`Text Similarity: ${analysis.text_similarity}%`)

    addText(`Skill Coverage: ${analysis.skill_coverage}%`)



    addSection('MATCHED SKILLS', analysis.matched_skills)

    addSection('MISSING SKILLS', analysis.missing_skills)

    addSection('REQUIRED SKILLS', analysis.required_skills)



    addText('IMPROVEMENT SUGGESTIONS', { size: 14, bold: true })



    if (analysis.missing_skills?.length > 0) {

      addText(

        `Consider learning or gaining practical experience in: ${analysis.missing_skills.join(', ')}.`

      )

    } else {

      addText(

        'Your resume covers all identified required skills. Continue strengthening your experience with relevant projects.'

      )

    }



    addText(

      'Note: This report is based on automated resume matching. Review the job requirements and tailor your resume before applying.',

      { size: 9 }

    )



    const safeFilename = (result.filename || 'resume')

      .replace(/\.pdf$|\.docx$/i, '')

      .replace(/[^a-z0-9_-]/gi, '_')



    doc.save(`${safeFilename}_analysis_report.pdf`)

  }



  const analyzeResume = async () => {

    if (!file || !jobDescription.trim()) return



    setLoading(true)

    setError('')

    setResult(null)



    const formData = new FormData()

    formData.append('file', file)

    formData.append('job_description', jobDescription)



    try {

      const response = await fetch(`${API}/resume/match`, {

        method: 'POST',

        body: formData

      })



      const data = await response.json()



      if (!response.ok) {

        throw new Error(data.detail || 'Analysis failed')

      }



      setResult(data)

      loadStats()



      try {

        const analyticsResponse = await fetch(`${API}/history/analytics`)



        if (analyticsResponse.ok) {

          const analyticsData = await analyticsResponse.json()

          setAnalytics(analyticsData)

        }

      } catch (err) {

        console.error('Analytics refresh failed:', err)

      }

    } catch (err) {

      setError(err.message || 'Unable to connect to backend')

    } finally {

      setLoading(false)

    }

  }



  const analysis = result?.analysis



  return (

    <div className="app">

      <aside className="sidebar">

        <div className="brand">

          <div className="brand-icon">R</div>

          <div>

            <h2>Resumind</h2>

            <span>AI Career Intelligence</span>

          </div>

        </div>



        <p className="menu-label">WORKSPACE</p>



        <button

          className={`nav-item ${activePage === 'Dashboard' ? 'active' : ''}`}

          onClick={() => {

            setActivePage('Dashboard')

            setSelectedResume(null)

            loadStats()

          }}

        >

          <span>▦</span> Dashboard

        </button>



        <button

          className={`nav-item ${activePage === 'Resume Analyzer' ? 'active' : ''}`}

          onClick={() => {

            setActivePage('Resume Analyzer')

            setSelectedResume(null)

          }}

        >

          <span>◈</span> Resume Analyzer

        </button>



        <button

          className={`nav-item ${activePage === 'History' ? 'active' : ''}`}

          onClick={loadHistory}

        >

          <span>◷</span> History

        </button>



        <button

          className={`nav-item ${activePage === 'Analytics' ? 'active' : ''}`}

          onClick={loadAnalytics}

        >

          <span>▥</span> Analytics

        </button>



        <div className="sidebar-bottom">

          <div className="profile">

            <div className="avatar">U</div>

            <div>

              <strong>My Workspace</strong>

              <span>Personal account</span>

            </div>

          </div>

        </div>

      </aside>



      <main className="main-content">

        <header className="topbar">

          <div>

            <span className="breadcrumb">Workspace / </span>

            <strong>

              {selectedResume ? 'Resume Details' : activePage}

            </strong>

          </div>



          <div className="status">

            <span className="status-dot"></span> AI Engine

          </div>

        </header>



        <section className="content">

          {activePage === 'Analytics' ? (

            <>

              <div className="section-heading">

                <div>

                  <h2>Match Score Analytics</h2>

                  <p>

                    Track your resume performance across job applications.

                  </p>

                </div>



                <button

                  className="analyze-button"

                  style={{ width: 'auto' }}

                  onClick={loadAnalytics}

                  disabled={analyticsLoading}

                >

                  {analyticsLoading ? 'Refreshing...' : '↻ Refresh'}

                </button>

              </div>



              {analyticsLoading && <p>Loading analytics...</p>}



              {analyticsError && (

                <div className="error-message">{analyticsError}</div>

              )}



              {analytics && !analyticsLoading && (

                <>

                  <div className="stats">

                    <div className="stat-card">

                      <span>01</span>

                      <p>Total Analyses</p>

                      <strong>{analytics.total_analyses}</strong>

                    </div>



                    <div className="stat-card">

                      <span>02</span>

                      <p>Average Match Score</p>

                      <strong>{analytics.average_match_score}%</strong>

                    </div>



                    <div className="stat-card">

                      <span>03</span>

                      <p>Latest Match Score</p>

                      <strong>

                        {analytics.scores?.length

                          ? `${analytics.scores[analytics.scores.length - 1].match_score}%`

                          : 'N/A'}

                      </strong>

                    </div>

                  </div>



                  <AnalyticsChart scores={analytics.scores || []} />



                  <div className="panel">

                    <h3>Analysis Records</h3>

                    <p className="panel-description">

                      Your historical job matching results.

                    </p>



                    {analytics.scores?.length === 0 ? (

                      <p>No analysis records available yet.</p>

                    ) : (

                      analytics.scores?.map(item => (

                        <div

                          key={item.analysis_id}

                          style={{

                            padding: '16px 0',

                            borderBottom: '1px solid #e9eaf0'

                          }}

                        >

                          <strong>Analysis #{item.analysis_id}</strong>

                          <p>{item.filename}</p>

                          <p>

                            Match: {item.match_score}% ·

                            Text: {item.text_similarity}% ·

                            Skills: {item.skill_coverage}%

                          </p>

                          <small>

                            {new Date(item.created_at).toLocaleString()}

                          </small>

                        </div>

                      ))

                    )}

                  </div>

                </>

              )}

            </>

          ) : activePage === 'History' ? (

            <>

              {selectedResume ? (

                <>

                  <button

                    className="analyze-button"

                    style={{ width: 'auto', marginBottom: '25px' }}

                    onClick={() => setSelectedResume(null)}

                  >

                    ← Back to History

                  </button>



                  <div className="section-heading">

                    <div>

                      <h2>{selectedResume.filename}</h2>

                      <p>

                        Resume ID: {selectedResume.resume_id} · Uploaded:{' '}

                        {new Date(selectedResume.created_at).toLocaleString()}

                      </p>

                    </div>



                    <span className="ai-badge">

                      {selectedResume.total_skills} Skills Found

                    </span>

                  </div>



                  <div className="panel">

                    <h3>Detected Skills</h3>

                    <p className="panel-description">

                      Skills extracted from your uploaded resume.

                    </p>



                    <div className="skill-panels">

                      {Object.entries(

                        selectedResume.detected_skills || {}

                      ).map(([category, skills]) => (

                        <div className="panel" key={category}>

                          <h3>{category}</h3>

                          <div className="skill-list">

                            {skills.map(skill => (

                              <span className="skill matched" key={skill}>

                                ✓ {skill}

                              </span>

                            ))}

                          </div>

                        </div>

                      ))}

                    </div>

                  </div>



                  <div className="section-heading">

                    <div>

                      <h2>Previous Job Analyses</h2>

                      <p>

                        Matching reports associated with this resume.

                      </p>

                    </div>

                  </div>



                  {selectedResume.analyses?.length > 0 ? (

                    selectedResume.analyses.map(item => (

                      <div className="panel" key={item.analysis_id}>

                        <h3>Analysis #{item.analysis_id}</h3>



                        <p className="panel-description">

                          {new Date(item.created_at).toLocaleString()}

                        </p>



                        <div className="result-score">

                          <span>Overall Match Score</span>

                          <strong>{item.match_score}%</strong>

                        </div>



                        <div className="result-grid">

                          <div className="result-card">

                            <span>Text Similarity</span>

                            <strong>{item.text_similarity}%</strong>

                          </div>

                          <div className="result-card">

                            <span>Skill Coverage</span>

                            <strong>{item.skill_coverage}%</strong>

                          </div>

                          <div className="result-card">

                            <span>Matched Skills</span>

                            <strong>{item.matched_skills.length}</strong>

                          </div>

                          <div className="result-card">

                            <span>Missing Skills</span>

                            <strong>{item.missing_skills.length}</strong>

                          </div>

                        </div>



                        <div className="skill-panels">

                          <div className="panel">

                            <h3>Matched Skills</h3>

                            <div className="skill-list">

                              {item.matched_skills.map(skill => (

                                <span className="skill matched" key={skill}>

                                  ✓ {skill}

                                </span>

                              ))}

                            </div>

                          </div>



                          <div className="panel">

                            <h3>Missing Skills</h3>

                            <div className="skill-list">

                              {item.missing_skills.length > 0 ? (

                                item.missing_skills.map(skill => (

                                  <span className="skill missing" key={skill}>

                                    + {skill}

                                  </span>

                                ))

                              ) : (

                                <p>No missing required skills.</p>

                              )}

                            </div>

                          </div>

                        </div>



                        <div className="panel">

                          <h3>Required Skills</h3>

                          <div className="skill-list">

                            {item.required_skills.map(skill => (

                              <span className="skill" key={skill}>

                                {skill}

                              </span>

                            ))}

                          </div>

                        </div>

                      </div>

                    ))

                  ) : (

                    <div className="panel">

                      <p>No previous job analyses for this resume.</p>

                    </div>

                  )}

                </>

              ) : (

                <>

                  <div className="section-heading">

                    <div>

                      <h2>Resume History</h2>

                      <p>

                        View your uploaded resumes and analysis details.

                      </p>

                    </div>



                    <span className="ai-badge">

                      {history.length} Records

                    </span>

                  </div>



                  {historyLoading && <p>Loading resume history...</p>}

                  {detailsLoading && <p>Loading resume details...</p>}



                  {historyError && (

                    <div className="error-message">{historyError}</div>

                  )}



                  {!historyLoading && !historyError && (

                    <div className="panel">

                      <h3>Uploaded Resumes</h3>

                      <p className="panel-description">

                        Click a resume to view its complete details.

                      </p>



                      {history.map(resume => (

                        <div

                          key={resume.id}

                          style={{

                            display: 'flex',

                            justifyContent: 'space-between',

                            alignItems: 'center',

                            flexWrap: 'wrap',

                            gap: '12px',

                            padding: '18px 0',

                            borderBottom: '1px solid #e9eaf0'

                          }}

                        >

                          <div>

                            <strong>{resume.filename}</strong>

                            <p style={{ margin: '6px 0', color: '#777' }}>

                              Resume ID: {resume.id}

                            </p>

                            <span style={{ color: '#777', fontSize: '13px' }}>

                              {new Date(resume.created_at).toLocaleString()}

                            </span>

                          </div>



                          <div style={{ textAlign: 'right' }}>

                            <strong>{resume.total_skills}</strong>

                            <p style={{ margin: '5px 0', color: '#777' }}>

                              Skills extracted

                            </p>

                            <button

                              className="analyze-button"

                              style={{ width: 'auto', marginTop: '8px' }}

                              onClick={() => loadResumeDetails(resume.id)}

                            >

                              View Details →

                            </button>

                          </div>

                        </div>

                      ))}

                    </div>

                  )}

                </>

              )}

            </>

          ) : (

            <>

              <div className="welcome">

                <div>

                  <span className="eyebrow">

                    AI-POWERED CAREER PLATFORM

                  </span>

                  <h1>Find your next opportunity.</h1>

                  <p>

                    Analyze your resume, discover skill gaps and understand

                    how well you match your dream job.

                  </p>

                </div>

                <div className="welcome-icon">✦</div>

              </div>



              {activePage === 'Dashboard' && (

                <>

                  <div className="section-heading">

                    <div>

                      <h2>Dashboard Overview</h2>

                      <p>

                        Real-time statistics from your resume database.

                      </p>

                    </div>



                    <button

                      className="analyze-button"

                      style={{ width: 'auto' }}

                      onClick={loadStats}

                      disabled={statsLoading}

                    >

                      {statsLoading ? 'Refreshing...' : '↻ Refresh'}

                    </button>

                  </div>



                  {statsError && (

                    <div className="error-message">{statsError}</div>

                  )}



                  {statsLoading && !stats && (

                    <p>Loading dashboard statistics...</p>

                  )}



                  {stats && (

                    <div className="stats">

                      <div className="stat-card">

                        <span>01</span>

                        <p>Total Resumes</p>

                        <strong>{stats.total_resumes}</strong>

                      </div>



                      <div className="stat-card">

                        <span>02</span>

                        <p>Analyses Completed</p>

                        <strong>{stats.total_analyses}</strong>

                      </div>



                      <div className="stat-card">

                        <span>03</span>

                        <p>Average Match Score</p>

                        <strong>{stats.average_match_score}%</strong>

                      </div>



                      <div className="stat-card">

                        <span>04</span>

                        <p>Latest Resume</p>

                        <strong style={{ fontSize: '16px' }}>

                          {stats.latest_resume

                            ? stats.latest_resume.filename

                            : 'No uploads yet'}

                        </strong>

                        {stats.latest_resume && (

                          <small>

                            Resume ID: {stats.latest_resume.id}

                          </small>

                        )}

                      </div>

                    </div>

                  )}

                </>

              )}



              <div className="section-heading">

                <div>

                  <h2>Resume Analysis</h2>

                  <p>

                    Upload your resume and compare it with a job description.

                  </p>

                </div>

                <span className="ai-badge">✦ AI Powered</span>

              </div>



              <div className="analysis-grid">

                <div className="panel">

                  <h3>Upload your resume</h3>

                  <p className="panel-description">

                    Select your latest resume to get started.

                  </p>



                  <label className="upload-area">

                    <input

                      type="file"

                      accept=".pdf,.docx"

                      onChange={e => {

                        setFile(e.target.files[0] || null)

                        setResult(null)

                        setError('')

                      }}

                    />



                    <div className="upload-icon">↑</div>

                    <strong>

                      {file ? file.name : 'Click to upload your resume'}

                    </strong>

                    <span>

                      {file

                        ? 'File selected successfully'

                        : 'PDF or DOCX · Maximum 5 MB'}

                    </span>

                  </label>



                  <div className="file-note">

                    <span>▤</span>

                    Your resume is processed securely by the analysis API.

                  </div>

                </div>



                <div className="panel">

                  <h3>Job description</h3>

                  <p className="panel-description">

                    Paste the job description you want to match against.

                  </p>



                  <textarea

                    className="job-input"

                    placeholder="Paste the job description here..."

                    value={jobDescription}

                    onChange={e => setJobDescription(e.target.value)}

                  />



                  <div className="input-footer">

                    <span>{jobDescription.length} characters</span>

                    <span>Required for matching</span>

                  </div>

                </div>

              </div>



              <button

                className="analyze-button"

                onClick={analyzeResume}

                disabled={!file || !jobDescription.trim() || loading}

              >

                {loading ? 'Analyzing your resume...' : '✦ Analyze Resume'}

              </button>



              {error && (

                <div className="error-message">{error}</div>

              )}



              {analysis && (

                <section className="results">

                  <div className="section-heading">

                    <div>

                      <h2>Analysis Results</h2>

                      <p>Your resume matching report.</p>

                    </div>



                    <div style={{

                      display: 'flex',

                      alignItems: 'center',

                      gap: '12px',

                      flexWrap: 'wrap'

                    }}>

                      <span className="ai-badge">

                        Analysis complete

                      </span>



                      <button

                        className="analyze-button"

                        style={{ width: 'auto' }}

                        onClick={downloadPdfReport}

                      >

                        ↓ Download PDF

                      </button>

                    </div>

                  </div>



                  <div className="result-score">

                    <span>Overall Match Score</span>

                    <strong>{analysis.match_score}%</strong>

                    <p>{result.filename}</p>

                  </div>



                  <div className="result-grid">

                    <div className="result-card">

                      <span>Text Similarity</span>

                      <strong>{analysis.text_similarity}%</strong>

                    </div>



                    <div className="result-card">

                      <span>Skill Coverage</span>

                      <strong>{analysis.skill_coverage}%</strong>

                    </div>



                    <div className="result-card">

                      <span>Matched Skills</span>

                      <strong>{analysis.total_matched_skills}</strong>

                    </div>



                    <div className="result-card">

                      <span>Missing Skills</span>

                      <strong>{analysis.missing_skills.length}</strong>

                    </div>

                  </div>



                  <div className="skill-panels">

                    <div className="panel">

                      <h3>Matched Skills</h3>

                      <div className="skill-list">

                        {analysis.matched_skills.map(skill => (

                          <span className="skill matched" key={skill}>

                            ✓ {skill}

                          </span>

                        ))}

                      </div>

                    </div>



                    <div className="panel">

                      <h3>Missing Skills</h3>

                      <div className="skill-list">

                        {analysis.missing_skills.length > 0 ? (

                          analysis.missing_skills.map(skill => (

                            <span className="skill missing" key={skill}>

                              + {skill}

                            </span>

                          ))

                        ) : (

                          <p>No missing required skills.</p>

                        )}

                      </div>

                    </div>

                  </div>



                  <SkillGapRecommendations

                    missingSkills={analysis.missing_skills || []}

                  />

                  <ResumeImprovementSuggestions analysis={analysis} />

                </section>

              )}

            </>

          )}

        </section>

      </main>

    </div>

  )

}



export default App
