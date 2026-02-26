# Notes — Week 1: Introduction to Web Development

## 1. What is a Website?

A **website** is a collection of related web pages accessible under a single domain name and hosted on a web server.

| Type | Description | Examples |
|------|-------------|---------|
| **Static** | HTML/CSS/JS files are served to the browser as-is | Documentation, portfolio |
| **Dynamic** | Content is generated on the server for each request | Online store, social network |
| **SPA** (Single-Page Application) | A single HTML page; content changes via JS without reloading | Gmail, Trello |

**How a browser renders a page:**
1. Downloads HTML → builds the **DOM** (Document Object Model)
2. Downloads CSS → builds the **CSSOM**
3. Combines them into the **Render Tree** → calculates Layout → paints (Paint)

---

## 2. How Does the Web Work?

### Key Concepts

- **DNS (Domain Name System)** — translates a domain name (`example.com`) into an IP address (`93.184.216.34`).
- **IP address** — a unique numerical address of a device on the network.
- **TCP/IP** — a transport protocol that ensures reliable delivery of data packets.
- **HTTP/HTTPS** — an application-layer protocol for transferring hypertext; HTTPS adds encryption (TLS).

### Request-Response Cycle

```
Browser                          Server
  |                                |
  |--- DNS query: example.com ---->|  (DNS server returns IP)
  |<-- IP: 93.184.216.34 ----------|
  |                                |
  |--- TCP SYN ---------------------->|
  |<-- TCP SYN-ACK -------------------|
  |--- TCP ACK ----------------------->|  (connection established)
  |                                |
  |--- GET / HTTP/1.1 ------------->|
  |    Host: example.com           |
  |<-- HTTP/1.1 200 OK ------------|
  |    Content-Type: text/html     |
  |    <html>...</html>            |
```

### HTTP Methods

| Method | Purpose |
|--------|---------|
| `GET` | Retrieve a resource |
| `POST` | Create a resource / submit data |
| `PUT` / `PATCH` | Update a resource (fully / partially) |
| `DELETE` | Delete a resource |

### HTTP Response Codes

| Range | Meaning | Examples |
|-------|---------|---------|
| 2xx | Success | `200 OK`, `201 Created` |
| 3xx | Redirect | `301 Moved Permanently`, `304 Not Modified` |
| 4xx | Client error | `400 Bad Request`, `401 Unauthorized`, `404 Not Found` |
| 5xx | Server error | `500 Internal Server Error`, `503 Service Unavailable` |

---

## 3. Client-side vs. Server-side Technologies

### Client-side (Frontend)

Code runs **in the user's browser**.

| Technology | Role |
|-----------|------|
| **HTML** | Document structure |
| **CSS** | Visual appearance and styling |
| **JavaScript** | Interactivity, client-side business logic |
| Frameworks | Angular, React, Vue — speed up UI development |

### Server-side (Backend)

Code runs **on the server**; the client only receives the result.

| Technology | Language |
|-----------|----------|
| Node.js / Express | JavaScript |
| Django | Python |
| Spring Boot | Java |
| Laravel | PHP |
| ASP.NET Core | C# |

### Comparison

```
Client-side                 Server-side
───────────────────         ───────────────────
+ Fast UI response          + Data security
+ Fewer server round-trips  + SEO (search engine indexing)
- Logic visible in DevTools - Latency (round-trip delay)
- Loads the client device
```

---

## 4. Frameworks & Libraries

| Concept | Definition | Examples |
|---------|-----------|---------|
| **Library** | A set of ready-made functions; the developer controls the flow | React, Lodash, Axios |
| **Framework** | Defines the application architecture; the framework calls your code ("inversion of control") | Angular, Django, Spring Boot |

> **Inversion of Control (IoC):** "Don't call us — we'll call you." The framework invokes your code at the right moment.

---

## 5. Back-End Framework Comparison

| Framework | Language | Performance | Learning Curve | Use Cases |
|-----------|----------|-------------|----------------|-----------|
| **Express.js** | JavaScript | Medium | Low | Lightweight APIs, microservices |
| **NestJS** | TypeScript | Medium | Medium | Enterprise applications |
| **Django** | Python | Medium | Medium | Rapid prototyping, ML integration |
| **FastAPI** | Python | High | Low | REST APIs, ML services |
| **Spring Boot** | Java | High | High | Enterprise, banking, telecom |
| **Laravel** | PHP | Medium | Low | Websites, online stores |

**How to choose?**
- Team knows Python → Django / FastAPI
- Need the Node.js ecosystem → Express / NestJS
- High load and Java expertise → Spring Boot

---

## 6. Basic Scaling Techniques

### Vertical Scaling (Scale Up)

Increasing the power of a single server (more CPU, RAM).

```
[Server 1: 8 CPU] → [Server 1: 32 CPU]
```

- ✅ Simple to set up
- ❌ Physical limits; single point of failure

### Horizontal Scaling (Scale Out)

Adding more servers.

```
               ┌─ Server 1 ─┐
Client → Load Balancer ─────┼─ Server 2 ─┤ ← Database
               └─ Server 3 ─┘
```

- ✅ Linear growth; fault tolerance
- ❌ More complex architecture (sessions, data consistency)

### Load Balancer

Distributes requests across multiple servers. Common algorithms:
- **Round Robin** — requests are distributed in turn
- **Least Connections** — routes to the server with the fewest active connections
- **IP Hash** — the same client always reaches the same server (sticky session)

### Caching

| Level | Tool | What is cached |
|-------|------|---------------|
| Browser | `Cache-Control` HTTP headers | Static assets (CSS, JS, images) |
| CDN | Cloudflare, Akamai | Static resources close to the user |
| Application | Redis, Memcached | DB query results, sessions |
| DB | Query Cache, indexes | Results of complex SQL queries |

---

## 7. What is an API?

**API (Application Programming Interface)** — an interface through which one program communicates with another.

### REST API

**REST (Representational State Transfer)** — an architectural style based on HTTP:

| Principle | Description |
|-----------|-------------|
| **Stateless** | Each request is independent; the server stores no client state |
| **Uniform Interface** | Consistent rules for forming URLs and using methods |
| **Resources** | Data is identified by URLs (`/users/42`) |
| **Representations** | A resource can be transferred in different formats (JSON, XML) |

### REST Request Structure

```http
GET /api/users/42 HTTP/1.1
Host: api.example.com
Authorization: Bearer <token>
Accept: application/json
```

### REST Response Structure

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 42,
  "name": "Alice",
  "email": "alice@example.com"
}
```

### JSON as a Data Exchange Format

```json
{
  "id": 1,
  "title": "Buy milk",
  "completed": false,
  "tags": ["shopping", "personal"]
}
```

### API Types

| Type | Description |
|------|-------------|
| **REST** | Most widely used; leverages HTTP methods |
| **GraphQL** | The client specifies exactly which fields it needs; flexible queries |
| **gRPC** | High performance; binary protocol (Protocol Buffers) |
| **WebSocket** | Bidirectional real-time connection |

---

## Key Terms

| Term | Definition |
|------|-----------|
| DNS | Domain Name System |
| HTTP/HTTPS | Hypertext Transfer Protocol (S = Secure) |
| DOM | Document Object Model |
| SPA | Single-Page Application |
| REST | Architectural style for APIs |
| API | Application Programming Interface |
| CDN | Content Delivery Network |
| Load Balancer | Distributes incoming traffic across multiple servers |
| Cache | Temporary storage for faster data access |
