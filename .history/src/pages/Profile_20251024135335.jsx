import React, { useState, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Edit3, 
  Camera, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Award,
  Book,
  Briefcase,
  Users,
  Download,
  Share2,
  Star,
  TrendingUp,
  Target,
  GraduationCap
} from 'lucide-react'
import './Profile.css'

const Profile = () => {
  const { t } = useLanguage()
  const fileInputRef = useRef(null)
  
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    firstName: 'Александър',
    lastName: 'Иванов',
    position: t('Старши Софтуерен Инженер', 'Senior Software Engineer'),
    
    university: t('Софийски Университет "Св. Климент Охридски"', 'Sofia University "St. Kliment Ohridski"'),
    degree: t('Магистър по Компютърни Науки', 'Master of Computer Science'),
    email: 'alex.ivanov@techcorp.com',
    phone: '+359 88 123 4567',
    location: t('София, България', 'Sofia, Bulgaria'),
    joinDate: '2022-03-15',
    bio: t('Страстен софтуерен инженер с повече от 5 години опит в разработката на уеб приложения. Специализиран в React, Node.js и cloud технологии.', 'Passionate software engineer with over 5 years of experience in web application development. Specialized in React, Node.js and cloud technologies.'),
    skills: ['React', 'JavaScript', 'Node.js', 'TypeScript', 'Python', 'AWS'],
    interests: [t('Програмиране', 'Coding'), t('Планински туризъм', 'Hiking'), t('Фотография', 'Photography'), t('Четене', 'Reading')]
  })

  const [stats, setStats] = useState([
    { label: t('Общо процедури', 'Completed Projects'), value: 47, icon: Target, color: '#165895' },
    { label: t('Завършени процедури', 'Happy Clients'), value: 32, icon: Users, color: '#5FACE6' },
    { label: t('Години опит', 'Years Experience'), value: 5, icon: TrendingUp, color: '#FFD700' },
    { label: t('Награди', 'Awards'), value: 8, icon: Award, color: '#28a745' }
  ])

  const [activeTab, setActiveTab] = useState('overview')

  const education = [
    {
      id: 1,
      degree: t('Магистър по Компютърни Науки', 'Master of Computer Science'),
      university: t('Софийски Университет "Св. Климент Охридски"', 'Sofia University "St. Kliment Ohridski"'),
      period: '2019-2021',
      grade: t('Отличен 6.00', 'Excellent 6.00')
    },
    {
      id: 2,
      degree: t('Бакалавър по Информатика', 'Bachelor of Informatics'),
      university: t('Софийски Университет "Св. Климент Охридски"', 'Sofia University "St. Kliment Ohridski"'),
      period: '2015-2019',
      grade: t('Много Добър 5.50', 'Very Good 5.50')
    }
  ]

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        // В реално приложение тук ще качим снимката на сървъра
        console.log('Image uploaded:', e.target.result)
        alert(t('Профилната снимка е обновена!', 'Profile picture updated!'))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    setIsEditing(false)
    // Тук ще изпратим данните към сървъра
    alert(t('Профилът е запазен успешно!', 'Profile saved successfully!'))
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const tabs = [
    { id: 'overview', label: t('Преглед', 'Overview') },
    { id: 'experience', label: t('Опит', 'Experience') },
 
  ]

  const experiences = [
    {
      id: 1,
      position: t('Старши Софтуерен Инженер', 'Senior Software Engineer'),
 
      period: t('Март 2022 - Настояще', 'Mar 2022 - Present'),
      description: t('Ръководство на екип от разработчици, проектиране на архитектура, внедряване на best practices.', 'Leading a team of developers, designing architecture, implementing best practices.')
    },
    {
      id: 2,
      position: t('Софтуерен Инженер', 'Software Engineer'),
  
      period: t('Януари 2020 - Февруари 2022', 'Jan 2020 - Feb 2022'),
      description: t('Разработка на уеб приложения, работа с клиенти, оптимизация на производителност.', 'Web application development, client work, performance optimization.')
    },
    {
      id: 3,
      position: t('Джуниър Разработчик', 'Junior Developer'),
  
      period: t('Юни 2018 - Декември 2019', 'Jun 2018 - Dec 2019'),
      description: t('Участие в разработката на MVP проекти, обучение и усъвършенстване на умения.', 'Participated in MVP project development, training and skill improvement.')
    }
  ]

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <motion.div 
        className="profile-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="profile-background">
          <div className="background-overlay"></div>
        </div>
        
        <div className="profile-info">
          <div className="avatar-section">
            <div className="avatar-container">
              <img 
                src="/profile.png" 
                alt="Profile" 
                className="profile-avatar"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiByeD0iNzUiIGZpbGw9IiMxNjU4OTUiLz4KPHN2ZyB4PSI0MCIgeT0iNDAiIHdpZHRoPSI3MCIgaGVpZ2h0PSI3MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiPgo8cGF0aCBkPSJNMjAgMjF2LTJhNCA0IDAgMCAwLTQtNEg4YTQgNCAwIDAgMC00IDR2MiIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiLz4KPC9zdmc+Cjwvc3ZnPg=='
                }}
              />
              <motion.button 
                className="avatar-edit-btn"
                onClick={triggerFileInput}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Camera size={20} />
              </motion.button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>
            
            <div className="profile-main-info">
              <div className="name-section">
              
                <div>
                  <h1>{profile.firstName} {profile.lastName}</h1>
                  <p className="position">{profile.position}</p>
               
                </div>
              </div>
              
              <div className="profile-stats">
                {stats.map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    className="stat-item"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <stat.icon size={20} color={stat.color} />
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="profile-actions">
           
            <motion.button 
              className="btn btn-primary edit-btn"
              onClick={() => setIsEditing(!isEditing)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Edit3 size={18} />
              {isEditing ? t('Запази', 'Save') : t('Редактирай', 'Edit')}
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="profile-content">
        {/* Navigation Tabs */}
        <motion.div 
          className="profile-tabs"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <div className="tab-content">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="overview-content"
              >
                <div className="grid-layout">
                  {/* Personal Info Card */}
                  <div className="info-card">
                    <h3>{t('Лична информация', 'Personal Information')}</h3>
                    <div className="info-list">
                      <div className="info-item">
                        <Mail size={18} />
                        <span>{profile.email}</span>
                      </div>
                      <div className="info-item">
                        <Phone size={18} />
                        <span>{profile.phone}</span>
                      </div>
                      <div className="info-item">
                        <MapPin size={18} />
                        <span>{profile.location}</span>
                      </div>
                      <div className="info-item">
                        <Calendar size={18} />
                        <span>{t('Присъединил се', 'Joined')} {new Date(profile.joinDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bio Card */}
                  <div className="info-card">
                    <h3>{t('За мен', 'About Me')}</h3>
                    <p className="bio-text">{profile.bio}</p>
                  </div>

                  {/* Education Card */}
                  <div className="info-card">
                    <h3>{t('Образование', 'Education')}</h3>
                    <div className="education-preview">
                      {education.map((edu, index) => (
                        <motion.div 
                          key={edu.id}
                          className="edu-preview-item"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="edu-preview-icon">
                            <GraduationCap size={20} />
                          </div>
                          <div className="edu-preview-details">
                            <div className="edu-preview-degree">{edu.degree}</div>
                            <div className="edu-preview-university">{edu.university}</div>
                            <div className="edu-preview-meta">
                              <span className="edu-period">{edu.period}</span>
                              <span className="edu-grade">{edu.grade}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

               
                 

                </div>
              </motion.div>
            )}

            {activeTab === 'experience' && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="experience-content"
              >
                <div className="timeline">
                  {experiences.map((exp, index) => (
                    <motion.div 
                      key={exp.id}
                      className="timeline-item"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="timeline-marker">
                        <Briefcase size={20} />
                      </div>
                      <div className="timeline-content">
                        <h4>{exp.position}</h4>
                        
                        <p className="description">{exp.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="skills-content"
              >
                <div className="skills-categories">
                  <div className="skill-category">
                    <h4>{t('Frontend', 'Frontend')}</h4>
                    <div className="skill-levels">
                      {['React', 'JavaScript', 'TypeScript', 'HTML/CSS'].map(skill => (
                        <div key={skill} className="skill-level">
                          <span className="skill-name">{skill}</span>
                          <div className="level-bar">
                            <div 
                              className="level-fill"
                              style={{ width: `${Math.random() * 50 + 50}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="skill-category">
                    <h4>{t('Backend', 'Backend')}</h4>
                    <div className="skill-levels">
                      {['Node.js', 'Python', 'SQL', 'MongoDB'].map(skill => (
                        <div key={skill} className="skill-level">
                          <span className="skill-name">{skill}</span>
                          <div className="level-bar">
                            <div 
                              className="level-fill"
                              style={{ width: `${Math.random() * 50 + 50}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div 
            className="edit-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsEditing(false)}
          >
            <motion.div 
              className="edit-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>{t('Редактиране на профил', 'Edit Profile')}</h3>
                <button className="close-btn" onClick={() => setIsEditing(false)}>×</button>
              </div>
              
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label>{t('Име', 'First Name')}</label>
                    <input 
                      type="text" 
                      value={profile.firstName}
                      onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>{t('Фамилия', 'Last Name')}</label>
                    <input 
                      type="text" 
                      value={profile.lastName}
                      onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group full-width">
                    <label>{t('Длъжност', 'Position')}</label>
                    <input 
                      type="text" 
                      value={profile.position}
                      onChange={(e) => setProfile({...profile, position: e.target.value})}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group full-width">
                    <label>{t('Университет', 'University')}</label>
                    <input 
                      type="text" 
                      value={profile.university}
                      onChange={(e) => setProfile({...profile, university: e.target.value})}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group full-width">
                    <label>{t('Биография', 'Bio')}</label>
                    <textarea 
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      className="form-textarea"
                      rows="4"
                    />
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                  {t('Отказ', 'Cancel')}
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  {t('Запази', 'Save')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Profile