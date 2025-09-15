export interface DiagramItem {
  id: string;
  group: string;
  title: string;
  description?: string;
  tags?: string[];
  code: string;
}

// Style helper for exception nodes
const CLASSDEF = "classDef ex fill:#fff3cd,stroke:#f0ad4e,color:#8a6d3b;\n";

export const diagrams: DiagramItem[] = [
  {
    id: "GF1",
    group: "Marketing System",
    title: "Growth Funnel — activity with swimlanes",
    description: "Complete customer acquisition flow from kickoff to handoff, showing responsibilities across teams",
    tags: ["funnel", "swimlane", "process", "marketing", "kol"],
    code: `flowchart LR
${CLASSDEF}subgraph CL[Client Team]
    C0([Kickoff])
    C1[Approve ICP and offer]
    C2[Green light KOL shortlist]
    C3[Publish site updates and CTA]
    C4([Handoff and review])
  end
  subgraph AL[Alie Network]
    A1[Run SAGA score]
    A2[Build 30 day plan]
    A3[Draft posts and thread and prompt]
    A4[Brief KOLs <br/> unique links and codes]
    A5[UTM and event setup]
    A6[Weekly snapshot and report]
  end
  subgraph KO[KOL Creators]
    K1[Accept brief]
    K2[Post ad tagged content]
    K3[Drive to CTA link]
  end
  subgraph CM[Community]
    M1[See content]
    M2[Click CTA]
    M3[Join Discord]
    M4[First action <br/> claim or swap or book]
  end
  C0-->A1-->A2-->C1-->A3-->C2-->A4-->K1-->K2-->M1-->M2-->A5-->M3-->M4-->A6-->C4
  D1{CTR above target}
  D2{Activation above target}
  K2-->D1
  D1-- Yes -->M1
  D1-- No -->A3
  M4-->D2
  D2-- Yes -->A6
  D2-- No -->A4
  E1{{Creator delay}}:::ex
  E2{{Tracking broken}}:::ex
  E3{{Negative feedback spike}}:::ex
  K1-->E1
  A5-->E2
  M1-->E3`
  },
  {
    id: "MM2",
    group: "Marketing System", 
    title: "Measurement Map — use case style",
    description: "Event tracking architecture for user interactions and growth metrics",
    tags: ["measurement", "tracking", "events", "analytics"],
    code: `flowchart LR
  U([Visitor or User])
  subgraph SYS[Growth Stack]
    EV1((wallet_connect))
    EV2((swap_token))
    EV3((claim_ai_land))
    EV4((book_call))
    EV5((join_discord))
    KP((Dashboard and UTM))
  end
  U --> EV1
  U --> EV3
  U --> EV4
  EV1 --> EV2
  EV3 --> KP
  EV4 --> KP
  EV5 --> KP`
  },
  {
    id: "KC3",
    group: "Marketing System",
    title: "KOL Collaboration — sequence",
    description: "Step-by-step sequence showing interaction flow between teams during KOL campaigns",
    tags: ["sequence", "collaboration", "kol", "workflow", "communication"],
    code: `sequenceDiagram
  autonumber
  participant G as Growth Lead — Client
  participant A as Alie Network
  participant K as KOL Creator
  participant T as Tracking
  G->>A: Approve shortlist and budget
  A-->>G: Briefs and talking points
  A->>K: Outreach and ad policy
  K-->>A: Accept and publish window
  A->>T: Create UTM and unique codes
  K->>G: Post goes live — ad tag
  G-->>T: Traffic and events flow in
  T-->>A: Weekly snapshot
  A-->>G: Optimize creative and creator
  alt Issues
    K-->>A: Delay or reshoot
    T-->>A: Broken link or mismatch
  end`
  },
  {
    id: "LP4",
    group: "Marketing System",
    title: "14 Day Launch Plan — swimlane summary",
    description: "Two-week marketing campaign timeline with daily activities and exception handling",
    tags: ["launch", "timeline", "planning", "campaign", "swimlane"],
    code: `flowchart LR
${CLASSDEF}subgraph Week1
    W1a[Day1: Offer Matrix and SAGA page live]
    W1b[Day2: KOL shortlist and briefs]
    W1c[Day3: AI land promo push — two creatives]
    W1d[Day4: AMA announcement]
    W1e[Day5: KOL wave one live]
    W1f[Day6 to 7: Iterate and community recap]
  end
  subgraph Week2
    W2a[Day8: Agent launch demo clip]
    W2b[Day9: KOL wave two and retarget copy]
    W2c[Day10: Mini case study one]
    W2d[Day11: Spaces or AMA live]
    W2e[Day12: Update deck and metrics]
    W2f[Day13 to 14: Growth report and next sprint]
  end
  W1a-->W1b-->W1c-->W1d-->W1e-->W1f-->W2a-->W2b-->W2c-->W2d-->W2e-->W2f
  E1{{Budget shift}}:::ex
  E2{{Creator drop}}:::ex
  E3{{Platform policy flag}}:::ex
  W1e-->E2
  W1c-->E3
  W2b-->E1`
  },
  {
    id: "TA5",
    group: "Technical Architecture",
    title: "AI Agent Architecture — system design",
    description: "Technical architecture showing AI agent components and data flow",
    tags: ["architecture", "ai", "system", "technical", "agents"],
    code: `flowchart TB
  subgraph UI[User Interface Layer]
    WEB[Web Application]
    API[REST API Gateway]
    WS[WebSocket Connection]
  end
  
  subgraph CORE[AI Core Services]
    LLM[Language Models]
    EMB[Embedding Service]
    VEC[Vector Database]
    CACHE[Redis Cache]
  end
  
  subgraph AGENTS[Agent Layer]
    GA[Growth Agent]
    MA[Marketing Agent]
    AA[Analytics Agent]
    CA[Content Agent]
  end
  
  subgraph DATA[Data Layer]
    DB[(PostgreSQL)]
    S3[(Object Storage)]
    QUEUE[Message Queue]
  end
  
  WEB --> API
  API --> AGENTS
  WS --> AGENTS
  AGENTS --> CORE
  CORE --> DATA
  AGENTS --> QUEUE
  QUEUE --> DATA
  
  LLM -.-> VEC
  EMB --> VEC
  API -.-> CACHE`
  },
  {
    id: "UD6", 
    group: "Technical Architecture",
    title: "User Data Flow — privacy first",
    description: "User data processing flow emphasizing privacy and security measures",
    tags: ["privacy", "security", "data-flow", "compliance", "gdpr"],
    code: `flowchart LR
  subgraph USER[User Actions]
    U1[Connect Wallet]
    U2[Join Community]
    U3[Interact with AI]
    U4[Generate Content]
  end
  
  subgraph PROC[Processing Layer]
    P1{Privacy Check}
    P2[Encrypt Data]
    P3[Anonymize PII]
    P4[Generate Insights]
  end
  
  subgraph STORE[Secure Storage]
    S1[(Encrypted DB)]
    S2[(Audit Logs)]
    S3[(Analytics DB)]
  end
  
  U1 --> P1
  U2 --> P1
  U3 --> P1
  U4 --> P1
  
  P1 -->|Approved| P2
  P1 -->|Rejected| REJECT[Access Denied]
  P2 --> P3
  P3 --> P4
  P4 --> S1
  P4 --> S3
  P1 --> S2
  
  style P1 fill:#e1f5fe
  style P2 fill:#f3e5f5
  style P3 fill:#fff3e0
  style REJECT fill:#ffebee`
  },
  {
    id: "IS7",
    group: "Integration System", 
    title: "Third-party Integrations — API mesh",
    description: "External service integrations and API management architecture",
    tags: ["integration", "api", "third-party", "microservices", "mesh"],
    code: `flowchart TB
  subgraph EXT[External Services]
    TW[Twitter API]
    DC[Discord API] 
    TG[Telegram API]
    STRIPE[Stripe]
    FIGMA[Figma API]
  end
  
  subgraph GATEWAY[API Gateway]
    AUTH[Authentication]
    RATE[Rate Limiting]
    TRANS[Data Transform]
    LOG[Request Logging]
  end
  
  subgraph INT[Internal Services]
    USER[User Service]
    CONTENT[Content Service]
    PAYMENT[Payment Service]
    ANALYTICS[Analytics Service]
  end
  
  EXT --> GATEWAY
  GATEWAY --> INT
  
  AUTH -.-> USER
  RATE -.-> ANALYTICS
  TRANS -.-> CONTENT
  LOG -.-> ANALYTICS
  
  style AUTH fill:#e8f5e8
  style RATE fill:#fff3e0
  style TRANS fill:#e1f5fe
  style LOG fill:#f3e5f5`
  },
  {
    id: "DP8",
    group: "Data Pipeline",
    title: "Real-time Analytics Pipeline",
    description: "Data processing pipeline for real-time analytics and reporting",
    tags: ["analytics", "pipeline", "real-time", "etl", "streaming"],
    code: `flowchart LR
  subgraph SRC[Data Sources]
    APP[Applications]
    API[API Events]
    USER[User Actions]
    SYS[System Logs]
  end
  
  subgraph STREAM[Stream Processing]
    KAFKA[Kafka Streams]
    SPARK[Spark Streaming]
    FLINK[Apache Flink]
  end
  
  subgraph PROCESS[Processing Layer]
    CLEAN[Data Cleaning]
    ENRICH[Data Enrichment]
    AGGR[Aggregation]
    ML[ML Inference]
  end
  
  subgraph STORE[Storage Layer]
    DW[(Data Warehouse)]
    OLAP[(OLAP Cube)]
    CACHE[(Cache Layer)]
  end
  
  subgraph VIZ[Visualization]
    DASH[Dashboards]
    ALERT[Alerts]
    REPORT[Reports]
  end
  
  SRC --> STREAM
  STREAM --> PROCESS
  PROCESS --> STORE
  STORE --> VIZ
  
  CLEAN --> ENRICH
  ENRICH --> AGGR
  AGGR --> ML
  
  style KAFKA fill:#e1f5fe
  style SPARK fill:#fff3e0
  style ML fill:#e8f5e8`
  }
];