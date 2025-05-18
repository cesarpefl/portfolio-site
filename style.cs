body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #111;
  color: #f2f2f2;
  line-height: 1.6;
}

a {
  color: #00b7ff;
  text-decoration: none;
  transition: 0.3s ease;
}

a:hover {
  text-decoration: underline;
  color: #1ecfff;
}

.hero {
  background: linear-gradient(135deg, #000000, #222222);
  padding: 4rem 2rem;
  text-align: center;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.hero p {
  font-size: 1.25rem;
  color: #ccc;
}

.cta {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #00b7ff;
  color: #fff;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.cta:hover {
  background-color: #1ecfff;
}

main {
  max-width: 900px;
  margin: auto;
  padding: 2rem;
}

.projects,
.resume,
.contact {
  margin-bottom: 3rem;
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
}

.project-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.project-content iframe {
  margin-bottom: 1rem;
}

.resume-btn {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #00b7ff;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.resume-btn:hover {
  background-color: #1ecfff;
}

.contact ul {
  list-style: none;
  padding-left: 0;
}

.contact li {
  margin-bottom: 0.75rem;
}

footer {
  text-align: center;
  padding: 1rem;
  background-color: #0a0a0a;
  font-size: 0.9rem;
  color: #666;
}

