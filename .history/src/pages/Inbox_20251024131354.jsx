import React, { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Star, 
  Trash2, 
  Reply, 
  Forward, 
  Archive,
  Pin,
  User,
  Clock,
  Paperclip
} from 'lucide-react'
import './Inbox.css'

const Inbox = () => {
  const { t } = useLanguage()
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'John Doe',
      senderEmail: 'john@company.com',
      subject: t('Среща утре', 'Meeting Tomorrow'),
      preview: t('Имаме важна среща утре в 10:00...', 'We have an important meeting tomorrow at 10:00...'),
      timestamp: '2024-01-15T14:30:00',
      unread: true,
      starred: true,
      pinned: false,
      attachments: true,
      category: 'work'
    },
    {
      id: 2,
      sender: 'Sarah Wilson',
      senderEmail: 'sarah@design.com',
      subject: t('Дизайн проект', 'Design Project'),
      preview: t('Изпращам финалните дизайни за преглед...', 'Sending the final designs for review...'),
      timestamp: '2024-01-15T12:15:00',
      unread: true,
      starred: false,
      pinned: true,
      attachments: true,
      category: 'design'
    },
    {
      id: 3,
      sender: 'Mike Johnson',
      senderEmail: 'mike@tech.com',
      subject: t('Обновление на системата', 'System Update'),
      preview: t('Планирано е обновление на системата в събота...', 'System update is planned for Saturday...'),
      timestamp: '2024-01-14T16:45:00',
      unread: false,
      starred: true,
      pinned: false,
      attachments: false,
      category: 'tech'
    },
    {
      id: 4,
      sender: 'Anna Smith',
      senderEmail: 'anna@hr.com',
      subject: t('Годишна оценка', 'Annual Review'),
      preview: t('Моля, подгответе вашите годишни цели...', 'Please prepare your annual goals...'),
      timestamp: '2024-01-14T09:20:00',
      unread: false,
      starred: false,
      pinned: false,
      attachments: true,
      category: 'hr'
    },
    {
      id: 5,
      sender: 'Tech Support',
      senderEmail: 'support@company.com',
      subject: t('Обезопасяване на акаунта', 'Account Security'),
      preview: t('Забелязахме подозрителна активност...', 'We noticed suspicious activity...'),
      timestamp: '2024-01-13T18:30:00',
      unread: false,
      starred: false,
      pinned: true,
      attachments: false,
      category: 'security'
    }
  ])

  const [selectedMessage, setSelectedMessage] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [composing, setComposing] = useState(false)
  const [newMessage, setNewMessage] = useState({ to: '', subject: '', body: '' })

  const categories = [
    { id: 'all', name: t('Всички', 'All'), count: messages.length },
    { id: 'unread', name: t('Непрочетени', 'Unread'), count: messages.filter(m => m.unread).length },
    { id: 'starred', name: t('Отбелязани', 'Starred'), count: messages.filter(m => m.starred).length },
    { id: 'pinned', name: t('Закачени', 'Pinned'), count: messages.filter(m => m.pinned).length },
    { id: 'work', name: t('Работа', 'Work'), count: messages.filter(m => m.category === 'work').length },
    { id: 'design', name: t('Дизайн', 'Design'), count: messages.filter(m => m.category === 'design').length }
  ]

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.preview.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = activeCategory === 'all' || 
                           (activeCategory === 'unread' && message.unread) ||
                           (activeCategory === 'starred' && message.starred) ||
                           (activeCategory === 'pinned' && message.pinned) ||
                           message.category === activeCategory

    return matchesSearch && matchesCategory
  })

  const toggleStar = (id) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, starred: !msg.starred } : msg
    ))
  }

  const togglePin = (id) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, pinned: !msg.pinned } : msg
    ))
  }

  const markAsRead = (id) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, unread: false } : msg
    ))
  }

  const deleteMessage = (id) => {
    setMessages(messages.filter(msg => msg.id !== id))
    if (selectedMessage?.id === id) {
      setSelectedMessage(null)
    }
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now - date
    
    if (diff < 24 * 60 * 60 * 1000) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else {
      return date.toLocaleDateString()
    }
  }

  const sendMessage = () => {
    if (newMessage.to && newMessage.subject) {
      const newMsg = {
        id: messages.length + 1,
        sender: 'You',
        senderEmail: newMessage.to,
        subject: newMessage.subject,
        preview: newMessage.body.substring(0, 100) + '...',
        timestamp: new Date().toISOString(),
        unread: false,
        starred: false,
        pinned: false,
        attachments: false,
        category: 'sent'
      }
      setMessages([newMsg, ...messages])
      setComposing(false)
      setNewMessage({ to: '', subject: '', body: '' })
    }
  }

  return (
    <div className="inbox-page">
      {/* Header */}
      <div className="inbox-header">
        <h2>{t('Съобщения', 'Inbox')}</h2>
       
      </div>

      <div className="inbox-layout">
        {/* Sidebar */}
        <motion.div 
          className="inbox-sidebar"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="categories-list">
            {categories.map(category => (
              <motion.button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="category-name">{category.name}</span>
                <span className="category-count">{category.count}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Messages List */}
        <motion.div 
          className="messages-list"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="messages-header">
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder={t('Търсене в съобщения...', 'Search messages...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="filter-btn">
              <Filter size={20} />
            </button>
          </div>

          <div className="messages-container">
            <AnimatePresence>
              {filteredMessages.map((message, index) => (
                <motion.div
                  key={message.id}
                  className={`message-item ${message.unread ? 'unread' : ''} ${selectedMessage?.id === message.id ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedMessage(message)
                    markAsRead(message.id)
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                  layout
                >
                  <div className="message-avatar">
                    <User size={20} />
                  </div>
                  
                  <div className="message-content">
                    <div className="message-header">
                      <div className="message-sender">
                        <span className="sender-name">{message.sender}</span>
                        {message.pinned && <Pin size={14} className="pinned-icon" />}
                      </div>
                      <div className="message-time">{formatTime(message.timestamp)}</div>
                    </div>
                    
                    <div className="message-subject">{message.subject}</div>
                    <div className="message-preview">{message.preview}</div>
                    
                    <div className="message-meta">
                      {message.attachments && <Paperclip size={14} />}
                      <span className="message-category">{message.category}</span>
                    </div>
                  </div>

                  <div className="message-actions">
                    <button 
                      className={`star-btn ${message.starred ? 'starred' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleStar(message.id)
                      }}
                    >
                      <Star size={16} fill={message.starred ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Message Viewer */}
        <AnimatePresence>
          {selectedMessage && (
            <motion.div 
              className="message-viewer"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="viewer-header">
                <button className="back-btn" onClick={() => setSelectedMessage(null)}>
                  {t('← Назад', '← Back')}
                </button>
                <div className="viewer-actions">
                  <button className="action-btn" onClick={() => toggleStar(selectedMessage.id)}>
                    <Star size={18} fill={selectedMessage.starred ? 'currentColor' : 'none'} />
                  </button>
                  <button className="action-btn" onClick={() => togglePin(selectedMessage.id)}>
                    <Pin size={18} />
                  </button>
                  <button className="action-btn">
                    <Reply size={18} />
                  </button>
                  <button className="action-btn">
                    <Forward size={18} />
                  </button>
                  <button className="action-btn delete" onClick={() => deleteMessage(selectedMessage.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="message-details">
                <h2 className="message-title">{selectedMessage.subject}</h2>
                
                <div className="sender-info">
                  <div className="sender-avatar">
                    <User size={24} />
                  </div>
                  <div className="sender-details">
                    <div className="sender-name">{selectedMessage.sender}</div>
                    <div className="sender-email">{selectedMessage.senderEmail}</div>
                  </div>
                  <div className="message-date">
                    <Clock size={14} />
                    {new Date(selectedMessage.timestamp).toLocaleString()}
                  </div>
                </div>

                <div className="message-body">
                  <p>{selectedMessage.preview}</p>
                  <p>{t('Това е примерен текст на съобщението. Тук ще се покаже пълното съдържание на имейла.', 'This is a sample message text. The full email content will be displayed here.')}</p>
                </div>

                {selectedMessage.attachments && (
                  <div className="attachments">
                    <h4>{t('Прикачени файлове', 'Attachments')}</h4>
                    <div className="attachment-list">
                      <div className="attachment-item">
                        <Paperclip size={16} />
                        <span>{t('документ.pdf', 'document.pdf')}</span>
                      </div>
                      <div className="attachment-item">
                        <Paperclip size={16} />
                        <span>{t('изображение.jpg', 'image.jpg')}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Compose Modal */}
      <AnimatePresence>
        {composing && (
          <motion.div 
            className="compose-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setComposing(false)}
          >
            <motion.div 
              className="compose-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="compose-header">
                <h3>{t('Ново съобщение', 'New Message')}</h3>
                <button className="close-btn" onClick={() => setComposing(false)}>×</button>
              </div>
              
              <div className="compose-body">
                <input
                  type="text"
                  placeholder={t('До:', 'To:')}
                  value={newMessage.to}
                  onChange={(e) => setNewMessage({...newMessage, to: e.target.value})}
                  className="compose-input"
                />
                <input
                  type="text"
                  placeholder={t('Тема:', 'Subject:')}
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                  className="compose-input"
                />
                <textarea
                  placeholder={t('Напишете вашето съобщение...', 'Write your message...')}
                  value={newMessage.body}
                  onChange={(e) => setNewMessage({...newMessage, body: e.target.value})}
                  className="compose-textarea"
                  rows="10"
                />
              </div>
              
              <div className="compose-footer">
                <button className="btn btn-primary" onClick={sendMessage}>
                  {t('Изпрати', 'Send')}
                </button>
                <button className="btn btn-secondary" onClick={() => setComposing(false)}>
                  {t('Отказ', 'Cancel')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Inbox