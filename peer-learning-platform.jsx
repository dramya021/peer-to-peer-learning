import { useState } from "react";

const COLORS = {
  indigo900: "#1E1B4B",
  indigo700: "#3730A3",
  violet600: "#7C3AED",
  violet100: "#EDE9FE",
  lavender50: "#EEF2FF",
  amber400: "#F59E0B",
  amber100: "#FEF3C7",
  slate600: "#475569",
  slate400: "#94A3B8",
  slate100: "#F1F5F9",
  white: "#FFFFFF",
  green500: "#22C55E",
  rose500: "#EF4444",
  sky400: "#38BDF8",
};

const SUBJECTS = ["All", "Mathematics", "Physics", "Chemistry", "Biology", "History", "Computer Science", "Literature", "Economics"];

const SAMPLE_CONTENT = [
  { id: 1, title: "Calculus Made Easy: Derivatives Explained", author: "Priya S.", avatar: "PS", subject: "Mathematics", type: "video", duration: "18 min", likes: 142, views: 1204, thumbnail: "📐", description: "Step-by-step breakdown of derivatives using real-world analogies. Perfect for beginners struggling with the concept.", tags: ["calculus", "derivatives", "beginner"] },
  { id: 2, title: "Newton's Laws — Visual Notes", author: "Arjun M.", avatar: "AM", subject: "Physics", type: "notes", pages: 12, likes: 89, views: 730, thumbnail: "⚡", description: "Comprehensive hand-drawn notes covering all three Newton's laws with diagrams and solved examples.", tags: ["newton", "mechanics", "notes"] },
  { id: 3, title: "Organic Chemistry Reactions Cheatsheet", author: "Sneha K.", avatar: "SK", subject: "Chemistry", type: "notes", pages: 8, likes: 215, views: 2100, thumbnail: "🧪", description: "All major organic reactions on one page. Saved my exam life! Includes reaction conditions and mechanisms.", tags: ["organic", "reactions", "cheatsheet"] },
  { id: 4, title: "World War II — Causes & Consequences", author: "Rahul T.", avatar: "RT", subject: "History", type: "video", duration: "24 min", likes: 67, views: 540, thumbnail: "🌍", description: "A student's guide to understanding the roots and aftermath of WW2, narrated in simple language.", tags: ["ww2", "history", "war"] },
  { id: 5, title: "Python for Beginners: Loops & Functions", author: "Ananya R.", avatar: "AR", subject: "Computer Science", type: "video", duration: "32 min", likes: 301, views: 3800, thumbnail: "💻", description: "Learn Python loops and functions from scratch. Includes live coding, mistakes, and debugging tips.", tags: ["python", "loops", "beginner"] },
  { id: 6, title: "Cell Division: Mitosis vs Meiosis", author: "Dev P.", avatar: "DP", subject: "Biology", type: "notes", pages: 6, likes: 178, views: 1500, thumbnail: "🔬", description: "A visual comparison of mitosis and meiosis with labeled diagrams and memory tricks.", tags: ["cells", "mitosis", "meiosis"] },
  { id: 7, title: "Supply & Demand Curves Explained Simply", author: "Meera J.", avatar: "MJ", subject: "Economics", type: "video", duration: "15 min", likes: 95, views: 870, thumbnail: "📊", description: "I struggled with this in class so I made this video. Covers shifts, elasticity, and real-life examples.", tags: ["economics", "supply", "demand"] },
  { id: 8, title: "Shakespeare's Hamlet — Theme Analysis", author: "Kiran L.", avatar: "KL", subject: "Literature", type: "notes", pages: 10, likes: 54, views: 420, thumbnail: "📚", description: "Deep dive into themes of revenge, madness, and mortality in Hamlet. Great for essay prep.", tags: ["hamlet", "shakespeare", "themes"] },
  { id: 9, title: "Integration Techniques: IBP & Substitution", author: "Priya S.", avatar: "PS", subject: "Mathematics", type: "video", duration: "22 min", likes: 188, views: 1650, thumbnail: "∫", description: "Clear walkthroughs of integration by parts and substitution with plenty of practice problems.", tags: ["integration", "calculus", "advanced"] },
];

const LEADERBOARD = [
  { name: "Priya S.", avatar: "PS", uploads: 14, likes: 330, subject: "Mathematics" },
  { name: "Ananya R.", avatar: "AR", uploads: 11, likes: 301, subject: "Computer Science" },
  { name: "Sneha K.", avatar: "SK", uploads: 9, likes: 215, subject: "Chemistry" },
  { name: "Dev P.", avatar: "DP", uploads: 8, likes: 178, subject: "Biology" },
  { name: "Meera J.", avatar: "MJ", uploads: 7, likes: 95, subject: "Economics" },
];

function Avatar({ initials, size = 36, color = COLORS.violet600 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `linear-gradient(135deg, ${color}, ${COLORS.indigo700})`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: COLORS.white, fontWeight: 700, fontSize: size * 0.35,
      flexShrink: 0, fontFamily: "Sora, sans-serif",
    }}>{initials}</div>
  );
}

function Badge({ label, color = COLORS.violet100, textColor = COLORS.violet600 }) {
  return (
    <span style={{
      background: color, color: textColor,
      borderRadius: 99, padding: "2px 10px",
      fontSize: 11, fontWeight: 600, letterSpacing: 0.3,
    }}>{label}</span>
  );
}

function ContentCard({ item, onClick }) {
  const [liked, setLiked] = useState(false);
  return (
    <div onClick={onClick} style={{
      background: COLORS.white, borderRadius: 16,
      boxShadow: "0 2px 12px rgba(124,58,237,0.08)",
      overflow: "hidden", cursor: "pointer",
      transition: "transform 0.18s, box-shadow 0.18s",
      border: `1.5px solid ${COLORS.violet100}`,
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(124,58,237,0.16)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(124,58,237,0.08)"; }}
    >
      {/* Thumbnail */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.indigo900}, ${COLORS.violet600})`,
        height: 110, display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 52, position: "relative",
      }}>
        {item.thumbnail}
        <div style={{
          position: "absolute", top: 10, right: 10,
          background: item.type === "video" ? COLORS.rose500 : COLORS.amber400,
          color: COLORS.white, borderRadius: 8, padding: "3px 8px",
          fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
        }}>
          {item.type === "video" ? `▶ ${item.duration}` : `📄 ${item.pages}p`}
        </div>
      </div>
      {/* Body */}
      <div style={{ padding: "14px 16px 16px" }}>
        <div style={{ marginBottom: 6 }}>
          <Badge label={item.subject} />
        </div>
        <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 14.5, color: COLORS.indigo900, marginBottom: 6, lineHeight: 1.4 }}>
          {item.title}
        </div>
        <div style={{ fontSize: 12.5, color: COLORS.slate600, marginBottom: 12, lineHeight: 1.5 }}>
          {item.description.slice(0, 80)}…
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <Avatar initials={item.avatar} size={26} />
            <span style={{ fontSize: 12, color: COLORS.slate600, fontWeight: 600 }}>{item.author}</span>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button onClick={e => { e.stopPropagation(); setLiked(l => !l); }} style={{
              background: "none", border: "none", cursor: "pointer",
              color: liked ? COLORS.rose500 : COLORS.slate400,
              fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 3,
            }}>
              {liked ? "❤️" : "🤍"} {item.likes + (liked ? 1 : 0)}
            </button>
            <span style={{ fontSize: 12, color: COLORS.slate400 }}>👁 {item.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function UploadModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [type, setType] = useState("video");
  const [subject, setSubject] = useState("Mathematics");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = () => {
    if (!title) return;
    setUploaded(true);
    setTimeout(() => { onClose(); setUploaded(false); }, 2000);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(30,27,75,0.55)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999,
      backdropFilter: "blur(4px)",
    }} onClick={onClose}>
      <div style={{
        background: COLORS.white, borderRadius: 20, padding: "32px 32px 28px",
        width: "min(95vw, 480px)", boxShadow: "0 24px 60px rgba(30,27,75,0.22)",
        position: "relative",
      }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 18, background: "none",
          border: "none", fontSize: 22, cursor: "pointer", color: COLORS.slate400,
        }}>✕</button>

        {uploaded ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
            <div style={{ fontFamily: "Sora, sans-serif", fontSize: 20, fontWeight: 800, color: COLORS.violet600 }}>Uploaded Successfully!</div>
            <div style={{ color: COLORS.slate600, marginTop: 6 }}>Your content is now live for peers to learn from.</div>
          </div>
        ) : (
          <>
            <div style={{ fontFamily: "Sora, sans-serif", fontSize: 20, fontWeight: 800, color: COLORS.indigo900, marginBottom: 4 }}>Share Your Knowledge</div>
            <div style={{ color: COLORS.slate600, fontSize: 13.5, marginBottom: 22 }}>Help fellow students learn from you</div>

            {/* Type Toggle */}
            <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
              {["video", "notes"].map(t => (
                <button key={t} onClick={() => setType(t)} style={{
                  flex: 1, padding: "10px 0", borderRadius: 10, border: "2px solid",
                  borderColor: type === t ? COLORS.violet600 : COLORS.violet100,
                  background: type === t ? COLORS.violet100 : COLORS.white,
                  color: type === t ? COLORS.violet600 : COLORS.slate600,
                  fontWeight: 700, fontSize: 14, cursor: "pointer",
                  fontFamily: "Sora, sans-serif",
                }}>
                  {t === "video" ? "🎬 Video" : "📄 Notes / PDF"}
                </button>
              ))}
            </div>

            {/* Subject */}
            <label style={{ fontSize: 12, fontWeight: 700, color: COLORS.slate600, letterSpacing: 0.5, display: "block", marginBottom: 6 }}>SUBJECT</label>
            <select value={subject} onChange={e => setSubject(e.target.value)} style={{
              width: "100%", padding: "10px 12px", borderRadius: 10,
              border: `1.5px solid ${COLORS.violet100}`, background: COLORS.lavender50,
              color: COLORS.indigo900, fontSize: 14, marginBottom: 14,
              fontFamily: "Inter, sans-serif", outline: "none",
            }}>
              {SUBJECTS.slice(1).map(s => <option key={s}>{s}</option>)}
            </select>

            {/* Title */}
            <label style={{ fontSize: 12, fontWeight: 700, color: COLORS.slate600, letterSpacing: 0.5, display: "block", marginBottom: 6 }}>TITLE</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Quadratic Equations — Visual Proof" style={{
              width: "100%", padding: "10px 12px", borderRadius: 10,
              border: `1.5px solid ${COLORS.violet100}`, background: COLORS.lavender50,
              color: COLORS.indigo900, fontSize: 14, marginBottom: 14,
              fontFamily: "Inter, sans-serif", outline: "none", boxSizing: "border-box",
            }} />

            {/* Description */}
            <label style={{ fontSize: 12, fontWeight: 700, color: COLORS.slate600, letterSpacing: 0.5, display: "block", marginBottom: 6 }}>DESCRIPTION</label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} placeholder="Briefly describe what students will learn..." style={{
              width: "100%", padding: "10px 12px", borderRadius: 10,
              border: `1.5px solid ${COLORS.violet100}`, background: COLORS.lavender50,
              color: COLORS.indigo900, fontSize: 14, marginBottom: 18, resize: "none",
              fontFamily: "Inter, sans-serif", outline: "none", boxSizing: "border-box",
            }} />

            {/* Upload Zone */}
            <div style={{
              border: `2px dashed ${COLORS.violet600}`, borderRadius: 12,
              padding: "18px", textAlign: "center", marginBottom: 20,
              background: COLORS.violet100, cursor: "pointer",
            }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>{type === "video" ? "🎬" : "📄"}</div>
              <div style={{ fontWeight: 700, color: COLORS.violet600, fontSize: 14 }}>Click to upload {type === "video" ? "video" : "PDF / notes"}</div>
              <div style={{ color: COLORS.slate400, fontSize: 12, marginTop: 2 }}>{type === "video" ? "MP4, MOV up to 500MB" : "PDF, PNG, JPG up to 50MB"}</div>
            </div>

            <button onClick={handleUpload} style={{
              width: "100%", padding: "13px", borderRadius: 12, border: "none",
              background: title ? `linear-gradient(135deg, ${COLORS.violet600}, ${COLORS.indigo700})` : COLORS.slate100,
              color: title ? COLORS.white : COLORS.slate400,
              fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 15,
              cursor: title ? "pointer" : "not-allowed", letterSpacing: 0.3,
            }}>
              Publish to Community
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function ContentDetail({ item, onClose }) {
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    { id: 1, user: "Rohan V.", avatar: "RV", text: "This explained it way better than my textbook. Thank you so much!", time: "2h ago" },
    { id: 2, user: "Tanya B.", avatar: "TB", text: "Could you make a follow-up on integration? This was super helpful.", time: "5h ago" },
  ]);

  const addComment = () => {
    if (!comment.trim()) return;
    setComments(c => [{ id: Date.now(), user: "You", avatar: "YO", text: comment, time: "just now" }, ...c]);
    setComment("");
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(30,27,75,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999,
      backdropFilter: "blur(4px)", padding: "16px",
    }} onClick={onClose}>
      <div style={{
        background: COLORS.white, borderRadius: 20, width: "min(95vw, 680px)",
        maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 24px 60px rgba(30,27,75,0.22)",
      }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.indigo900}, ${COLORS.violet600})`,
          borderRadius: "20px 20px 0 0", padding: "28px 28px 24px",
          position: "relative",
        }}>
          <button onClick={onClose} style={{
            position: "absolute", top: 16, right: 18, background: "rgba(255,255,255,0.2)",
            border: "none", borderRadius: "50%", width: 32, height: 32,
            color: COLORS.white, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}>✕</button>
          <div style={{ fontSize: 48, marginBottom: 12 }}>{item.thumbnail}</div>
          <Badge label={item.subject} color="rgba(255,255,255,0.2)" textColor={COLORS.white} />
          <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 20, color: COLORS.white, marginTop: 8, marginBottom: 10, lineHeight: 1.3 }}>
            {item.title}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Avatar initials={item.avatar} size={32} color="rgba(255,255,255,0.3)" />
            <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 13.5, fontWeight: 600 }}>{item.author}</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "24px 28px" }}>
          {/* Stats Row */}
          <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
            {[
              { icon: "👁", val: item.views.toLocaleString(), label: "views" },
              { icon: item.type === "video" ? "⏱" : "📄", val: item.type === "video" ? item.duration : `${item.pages} pages`, label: "" },
              { icon: "❤️", val: item.likes, label: "likes" },
            ].map((s, i) => (
              <div key={i} style={{ background: COLORS.lavender50, borderRadius: 10, padding: "8px 14px", display: "flex", alignItems: "center", gap: 6 }}>
                <span>{s.icon}</span>
                <span style={{ fontWeight: 700, color: COLORS.indigo900, fontSize: 14 }}>{s.val} {s.label}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <div style={{ fontSize: 14.5, color: COLORS.slate600, lineHeight: 1.7, marginBottom: 18 }}>{item.description}</div>

          {/* Tags */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 22 }}>
            {item.tags.map(t => <Badge key={t} label={`#${t}`} color={COLORS.amber100} textColor="#92400E" />)}
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
            <button style={{
              flex: 1, padding: "12px", borderRadius: 12, border: "none",
              background: `linear-gradient(135deg, ${COLORS.violet600}, ${COLORS.indigo700})`,
              color: COLORS.white, fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 14,
              cursor: "pointer",
            }}>
              {item.type === "video" ? "▶ Watch Video" : "📥 Download Notes"}
            </button>
            <button onClick={() => setLiked(l => !l)} style={{
              padding: "12px 18px", borderRadius: 12,
              border: `2px solid ${liked ? COLORS.rose500 : COLORS.violet100}`,
              background: liked ? "#FFF5F5" : COLORS.white,
              color: liked ? COLORS.rose500 : COLORS.slate600,
              fontWeight: 700, fontSize: 14, cursor: "pointer",
            }}>
              {liked ? "❤️" : "🤍"} {item.likes + (liked ? 1 : 0)}
            </button>
          </div>

          {/* Comments */}
          <div style={{ borderTop: `1.5px solid ${COLORS.violet100}`, paddingTop: 22 }}>
            <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 15, color: COLORS.indigo900, marginBottom: 16 }}>
              💬 Discussion ({comments.length})
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
              <Avatar initials="YO" size={34} />
              <div style={{ flex: 1, display: "flex", gap: 8 }}>
                <input value={comment} onChange={e => setComment(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addComment()}
                  placeholder="Ask a question or share feedback…" style={{
                    flex: 1, padding: "9px 14px", borderRadius: 10,
                    border: `1.5px solid ${COLORS.violet100}`, background: COLORS.lavender50,
                    color: COLORS.indigo900, fontSize: 13.5, fontFamily: "Inter, sans-serif", outline: "none",
                  }} />
                <button onClick={addComment} style={{
                  padding: "9px 14px", borderRadius: 10, border: "none",
                  background: COLORS.violet600, color: COLORS.white,
                  fontWeight: 700, cursor: "pointer", fontSize: 14,
                }}>Send</button>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {comments.map(c => (
                <div key={c.id} style={{ display: "flex", gap: 10 }}>
                  <Avatar initials={c.avatar} size={32} />
                  <div>
                    <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
                      <span style={{ fontWeight: 700, fontSize: 13, color: COLORS.indigo900 }}>{c.user}</span>
                      <span style={{ fontSize: 11, color: COLORS.slate400 }}>{c.time}</span>
                    </div>
                    <div style={{ fontSize: 13.5, color: COLORS.slate600, marginTop: 2, lineHeight: 1.5 }}>{c.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("explore");
  const [activeSubject, setActiveSubject] = useState("All");
  const [search, setSearch] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [filterType, setFilterType] = useState("all");

  const filtered = SAMPLE_CONTENT.filter(c => {
    const matchSubject = activeSubject === "All" || c.subject === activeSubject;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.author.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some(t => t.includes(search.toLowerCase()));
    const matchType = filterType === "all" || c.type === filterType;
    return matchSubject && matchSearch && matchType;
  });

  const navItems = [
    { id: "explore", icon: "🔍", label: "Explore" },
    { id: "videos", icon: "🎬", label: "Videos" },
    { id: "notes", icon: "📄", label: "Notes" },
    { id: "top", icon: "🏆", label: "Leaderboard" },
    { id: "saved", icon: "🔖", label: "Saved" },
  ];

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: COLORS.lavender50, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #EEF2FF; } ::-webkit-scrollbar-thumb { background: #C4B5FD; border-radius: 3px; }
        input::placeholder, textarea::placeholder { color: #94A3B8; }
      `}</style>

      {/* Navbar */}
      <nav style={{
        background: `linear-gradient(135deg, ${COLORS.indigo900}, ${COLORS.indigo700})`,
        padding: "0 28px", display: "flex", alignItems: "center",
        justifyContent: "space-between", height: 62, position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 4px 20px rgba(30,27,75,0.25)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 26 }}>🎓</div>
          <div>
            <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, color: COLORS.white, fontSize: 17, lineHeight: 1 }}>PeerLearn</div>
            <div style={{ color: COLORS.sky400, fontSize: 10, fontWeight: 600, letterSpacing: 1 }}>BY STUDENTS • FOR STUDENTS</div>
          </div>
        </div>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: 380, margin: "0 28px", position: "relative" }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 15 }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search topics, students, subjects…" style={{
              width: "100%", padding: "9px 14px 9px 36px", borderRadius: 10,
              border: "none", background: "rgba(255,255,255,0.13)",
              color: COLORS.white, fontSize: 13.5, fontFamily: "Inter, sans-serif",
              outline: "none",
            }} />
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button onClick={() => setShowUpload(true)} style={{
            background: `linear-gradient(135deg, ${COLORS.amber400}, #F97316)`,
            border: "none", borderRadius: 10, padding: "9px 18px",
            color: COLORS.white, fontFamily: "Sora, sans-serif", fontWeight: 700,
            fontSize: 13.5, cursor: "pointer", whiteSpace: "nowrap",
          }}>+ Upload</button>
          <Avatar initials="YO" size={36} />
        </div>
      </nav>

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <aside style={{
          width: 200, background: COLORS.white, borderRight: `1.5px solid ${COLORS.violet100}`,
          padding: "20px 12px", position: "sticky", top: 62, height: "calc(100vh - 62px)", overflowY: "auto",
        }}>
          <div style={{ marginBottom: 24 }}>
            {navItems.map(n => (
              <button key={n.id} onClick={() => { setActiveTab(n.id); if (n.id === "videos") setFilterType("video"); else if (n.id === "notes") setFilterType("notes"); else setFilterType("all"); }} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "10px 14px", borderRadius: 10, border: "none",
                background: activeTab === n.id ? COLORS.violet100 : "none",
                color: activeTab === n.id ? COLORS.violet600 : COLORS.slate600,
                fontWeight: activeTab === n.id ? 700 : 500,
                fontSize: 14, cursor: "pointer", marginBottom: 2,
                fontFamily: "Inter, sans-serif", textAlign: "left",
              }}>
                <span style={{ fontSize: 18 }}>{n.icon}</span> {n.label}
              </button>
            ))}
          </div>

          <div style={{ borderTop: `1.5px solid ${COLORS.violet100}`, paddingTop: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.slate400, letterSpacing: 1, marginBottom: 10, paddingLeft: 14 }}>SUBJECTS</div>
            {SUBJECTS.slice(1).map(s => (
              <button key={s} onClick={() => setActiveSubject(s)} style={{
                width: "100%", textAlign: "left", padding: "7px 14px",
                background: activeSubject === s ? COLORS.violet100 : "none",
                color: activeSubject === s ? COLORS.violet600 : COLORS.slate600,
                border: "none", borderRadius: 8, fontSize: 13, cursor: "pointer",
                fontWeight: activeSubject === s ? 700 : 400, marginBottom: 1,
              }}>{s}</button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: "24px 28px", overflowY: "auto" }}>
          {activeTab === "top" ? (
            /* Leaderboard */
            <div style={{ maxWidth: 600 }}>
              <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 22, color: COLORS.indigo900, marginBottom: 6 }}>🏆 Top Contributors</div>
              <div style={{ color: COLORS.slate600, marginBottom: 24 }}>Students who help the most. You could be next!</div>
              {LEADERBOARD.map((s, i) => (
                <div key={s.name} style={{
                  background: COLORS.white, borderRadius: 14, padding: "18px 22px",
                  display: "flex", alignItems: "center", gap: 16, marginBottom: 12,
                  border: `1.5px solid ${i === 0 ? COLORS.amber400 : COLORS.violet100}`,
                  boxShadow: i === 0 ? `0 4px 20px rgba(245,158,11,0.15)` : "none",
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    background: i === 0 ? COLORS.amber400 : i === 1 ? "#C0C0C0" : i === 2 ? "#CD7F32" : COLORS.slate100,
                    fontWeight: 800, fontSize: 16, color: i < 3 ? COLORS.white : COLORS.slate600,
                  }}>{i + 1}</div>
                  <Avatar initials={s.avatar} size={40} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: COLORS.indigo900, fontSize: 15, fontFamily: "Sora, sans-serif" }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: COLORS.slate500 }}>{s.subject}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 800, color: COLORS.violet600, fontSize: 16 }}>{s.uploads} uploads</div>
                    <div style={{ fontSize: 12, color: COLORS.slate400 }}>❤️ {s.likes} likes</div>
                  </div>
                </div>
              ))}
            </div>
          ) : activeTab === "saved" ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontSize: 56 }}>🔖</div>
              <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 20, color: COLORS.indigo900, marginTop: 16 }}>No saved content yet</div>
              <div style={{ color: COLORS.slate600, marginTop: 8 }}>Tap the bookmark icon on any content to save it for later.</div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 22, color: COLORS.indigo900 }}>
                    {activeSubject === "All" ? "All Content" : activeSubject}
                  </div>
                  <div style={{ color: COLORS.slate600, fontSize: 13.5 }}>{filtered.length} resources from your peers</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {["all", "video", "notes"].map(t => (
                    <button key={t} onClick={() => setFilterType(t)} style={{
                      padding: "7px 14px", borderRadius: 8, border: "none",
                      background: filterType === t ? COLORS.violet600 : COLORS.white,
                      color: filterType === t ? COLORS.white : COLORS.slate600,
                      fontWeight: 600, fontSize: 13, cursor: "pointer",
                      border: `1.5px solid ${filterType === t ? COLORS.violet600 : COLORS.violet100}`,
                    }}>
                      {t === "all" ? "All" : t === "video" ? "🎬 Videos" : "📄 Notes"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject chips */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
                {SUBJECTS.map(s => (
                  <button key={s} onClick={() => setActiveSubject(s)} style={{
                    padding: "5px 14px", borderRadius: 99, border: "none",
                    background: activeSubject === s ? COLORS.violet600 : COLORS.white,
                    color: activeSubject === s ? COLORS.white : COLORS.slate600,
                    fontWeight: 600, fontSize: 13, cursor: "pointer",
                    border: `1.5px solid ${activeSubject === s ? COLORS.violet600 : COLORS.violet100}`,
                  }}>{s}</button>
                ))}
              </div>

              {filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                  <div style={{ fontSize: 48 }}>🔍</div>
                  <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 18, color: COLORS.indigo900, marginTop: 12 }}>No content found</div>
                  <div style={{ color: COLORS.slate600, marginTop: 6 }}>Try a different search term or subject.</div>
                </div>
              ) : (
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: 18,
                }}>
                  {filtered.map(item => (
                    <ContentCard key={item.id} item={item} onClick={() => setSelectedContent(item)} />
                  ))}
                </div>
              )}
            </>
          )}
        </main>

        {/* Right Sidebar — Stats */}
        <aside style={{
          width: 220, background: COLORS.white, borderLeft: `1.5px solid ${COLORS.violet100}`,
          padding: "20px 16px", position: "sticky", top: 62, height: "calc(100vh - 62px)", overflowY: "auto",
        }}>
          <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 14, color: COLORS.indigo900, marginBottom: 14 }}>📈 Platform Stats</div>
          {[
            { icon: "👨‍🎓", label: "Active Students", val: "4,821" },
            { icon: "🎬", label: "Videos Shared", val: "1,203" },
            { icon: "📄", label: "Notes Uploaded", val: "3,447" },
            { icon: "❤️", label: "Helpful Reactions", val: "28.6K" },
          ].map(s => (
            <div key={s.label} style={{ background: COLORS.lavender50, borderRadius: 10, padding: "12px", marginBottom: 10 }}>
              <div style={{ fontSize: 20 }}>{s.icon}</div>
              <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 18, color: COLORS.violet600, marginTop: 4 }}>{s.val}</div>
              <div style={{ fontSize: 11.5, color: COLORS.slate600 }}>{s.label}</div>
            </div>
          ))}

          <div style={{ borderTop: `1.5px solid ${COLORS.violet100}`, paddingTop: 16, marginTop: 8 }}>
            <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 14, color: COLORS.indigo900, marginBottom: 12 }}>🔥 Trending</div>
            {["#calculus", "#python", "#organicchemistry", "#ww2", "#newton"].map(tag => (
              <div key={tag} onClick={() => setSearch(tag.slice(1))} style={{
                background: COLORS.amber100, borderRadius: 8, padding: "6px 10px",
                marginBottom: 6, cursor: "pointer", color: "#92400E",
                fontSize: 12.5, fontWeight: 600,
              }}>{tag}</div>
            ))}
          </div>

          <div style={{ borderTop: `1.5px solid ${COLORS.violet100}`, paddingTop: 16, marginTop: 8 }}>
            <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 14, color: COLORS.indigo900, marginBottom: 10 }}>🌟 Your Impact</div>
            <div style={{ background: `linear-gradient(135deg, ${COLORS.violet600}, ${COLORS.indigo700})`, borderRadius: 12, padding: "14px", color: COLORS.white }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.5, opacity: 0.8 }}>STUDENTS HELPED</div>
              <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 800, fontSize: 28 }}>0</div>
              <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>Upload your first resource to start helping peers!</div>
              <button onClick={() => setShowUpload(true)} style={{
                marginTop: 10, background: COLORS.amber400, border: "none",
                borderRadius: 8, padding: "7px 14px", color: COLORS.white,
                fontWeight: 700, fontSize: 12, cursor: "pointer", width: "100%",
                fontFamily: "Sora, sans-serif",
              }}>Share Now →</button>
            </div>
          </div>
        </aside>
      </div>

      {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
      {selectedContent && <ContentDetail item={selectedContent} onClose={() => setSelectedContent(null)} />}
    </div>
  );
}
