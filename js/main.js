/* Green Oaisys — main.js
   EN/AR toggle (RTL), diagnostic Health Check quiz, marquee, scroll reveal */

(function () {
  'use strict';

  /* ============ SITE CONFIG — edit these ============ */
  // WhatsApp: digits only, country code, no + or spaces (e.g. Saudi 9665XXXXXXXX)
  const WHATSAPP_NUMBER = '966555260780';                 // +966 55 526 0780
  const WHATSAPP_MSG = {
    en: 'Hi Green Oaisys — I have a question about my business.',
    ar: 'السلام عليكم غرين أويسِس — عندي سؤال عن منشأتي.'
  };
  // Google Forms lead capture. Create a Google Form, then paste its formResponse URL
  // and the entry.XXXX field IDs here (see SETUP.md). Leave action '' to disable posting.
  const GFORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSc8f4wDb0tj3P2BrN8KWYLDKfawUNZ2E4tO3Ja__evigGZIQw/formResponse';
  const GFORM = {
    contact: {
      action: GFORM_ACTION,
      fields: { name: 'entry.374203874', business: 'entry.883999899', email: 'entry.1224152338', wa: 'entry.1409587846', message: 'entry.310011525' }
    },
    newsletter: {
      action: GFORM_ACTION,
      fields: { name: 'entry.374203874', email: 'entry.1224152338', wa: 'entry.1409587846' }
    }
  };

  /* ============ i18n dictionary ============ */
  const HTML_KEYS = new Set(['hero_h1', 'cta_contact', 'ai_title']);

  const I18N = {
    en: {
      nav_brand: 'Why systems',
      nav_method: 'The method',
      nav_offers: 'Offers',
      nav_about: 'About',
      nav_cta: "Book free Business X-Ray",
      hero_kicker: 'Turning Saudi-based businesses into brands — one system at a time',
      hero_h1: 'We build <span class="accent">systems</span> for Saudi-based SMEs.',
      hero_sub: 'Big-company operating discipline, in small-company hands — so your business:',
      hero_b1: 'Runs without you being there every hour',
      hero_b2: 'Grows from a business into a brand',
      hero_b3: 'Builds real value of its own',
      hero_cta1: "Apply for your free Business X-Ray",
      hero_cta2: 'Book a free 30-minute call',
      chat1: 'Boss, the client wants the price — what do I say?',
      chat2: 'Which contract is the latest version? 🤔',
      chat3: "Sara's off — who else knows how renewals work?",
      chat4: 'Need your approval on this. And this. And these three??',
      clarity_title: 'Active work — today',
      clarity1: 'New client — onboarding checklist started',
      clarity2: 'Renewal — reminder sent, awaiting payment',
      clarity3: 'Quote — priced from the rate card',
      owner1: 'Sara', owner2: 'Ahmed', owner3: 'Sara',
      vision_label: 'Our vision',
      vision_text: 'Systems excellence, in every Saudi-based SME.',
      wwd_kicker: 'What we do',
      wwd_h2: "We don't sell software. We build how your business runs.",
      wwd_sub: 'The work you already do becomes visible, owned, and repeatable. Machines take the repetition. Your team takes the ownership. You take back your time.',
      pillar1_t: 'See all the work in one place',
      pillar1_p: 'One live list of everything in motion, and one clear path from "new" to "done". The end of "where are we on this?"',
      pillar2_t: 'Hand over without losing control',
      pillar2_p: 'Every task gets one owner and a simple checklist. You delegate the work — not the worry.',
      pillar3_t: 'Make it stick',
      pillar3_p: 'Systems live where your team already works, with a short review rhythm — so they improve instead of gathering dust.',
      ai_title: "There's a reason <em>ai</em> is in our name.",
      ai_intro: "AI is changing how small businesses compete — and the teams that adopt it early will leave the rest behind. We choose the right tools for your business, set them up properly, and train your people to use them with confidence.",
      ai1_t: 'Your team, AI-capable',
      ai1_p: "We train your people on real tasks inside their actual work, until using AI feels as natural as using WhatsApp.",
      ai2_t: 'Busywork, off their plate',
      ai2_p: "AI agents handle the drafting, data entry, and follow-up chasing, so your team's hours go into work that actually needs them.",
      ai3_t: 'Customers answered in minutes',
      ai3_p: 'Every enquiry gets a fast, well-written reply at any hour of the day — in your tone of voice, by your rules.',
      ai4_t: 'Only where it helps',
      ai4_p: "We're selective. If AI doesn't make a task faster or better, we leave it out of your workflow.",
      brand_kicker: 'Business vs. brand',
      brand_h2: 'The difference between a business and a brand? Systems.',
      brand_sub: "A brand isn't a logo. It's a business that delivers excellence on repeat — with or without the owner in the room. Systems make that possible. They're what open second branches, win bigger clients, and make buyers pay a premium.",
      value1_t: 'Your time, returned',
      value1_p: 'The team handles the day-to-day. You handle the direction. And yes — a real holiday.',
      value2_t: 'Growth that adds profit, not pain',
      value2_p: 'When work is repeatable, new clients scale your revenue — not your working hours.',
      value3_t: 'A reputation that repeats itself',
      value3_p: "Customers come back for consistency, not luck. That's what turns a name into a brand.",
      value4_t: 'A business worth buying',
      value4_p: 'Documented operations are what investors, buyers, and banks pay real money for.',
      saudi_line: "Across Saudi, a new generation of owners is building brands, not just businesses. Systems are how they're doing it.",
      method_kicker: 'How we do it',
      method_h2: 'The Operating Clarity Method',
      method_sub: 'Eight steps that turn daily chaos into a machine — one workflow at a time. No big-bang transformation. No 40-page manuals.',
      step1_t: 'Diagnose the chaos', step1_p: 'Find where time, money, and your energy drain away.',
      step2_t: 'Map the critical flow', step2_p: 'One high-impact workflow, from trigger to done.',
      step3_t: 'Clarify ownership', step3_p: 'Clear decisions, clear handoffs. No more "I thought you had it."',
      step4_t: 'Simplify the work', step4_p: 'Cut and combine before writing anything down.',
      step5_t: 'Build only what gets used', step5_p: 'Short checklists and templates — not binders.',
      step6_t: 'Install it where work happens', step6_p: 'Inside the tools your team already opens — with AI agents on the repetitive steps.',
      step7_t: 'Train and transfer', step7_p: 'Your team runs it. You stop being the safety net.',
      step8_t: 'Review and improve', step8_p: 'A short monthly rhythm keeps the system alive.',
      offers_kicker: "Two ways to start",
      offers_h2: "Pick your starting point.",
      offers_sub: "Not sure yet? Get a free diagnosis first. Ready to move? We start building right away.",
      offer1_tier: 'Step 1 — Free',
      offer1_t: "The 2-Minute Business Leak Audit",
      offer1_price: 'Free',
      offer1_d: "Answer 12 questions. Get a full diagnosis of where your business leaks time, money, and your sanity — and the exact order to fix it.",
      offer1_i1: "A risk score across the 4 systems that make or break an SME",
      offer1_i2: "Your leaks turned into a real number — SAR and hours a week",
      offer1_i3: "A ranked 3-move plan you can start this week",
      offer1_btn: "Get my free diagnosis",
      offer2_badge: 'Most popular',
      offer2_tier: 'Step 2 — Diagnostic',
      offer2_t: "The Systemization Snapshot",
      offer2_d: "One focused session. We map exactly how your business runs, find where the money escapes, and hand you the fix — yours to keep, with us or without us.",
      offer2_i1: "Your entire operation mapped on one page",
      offer2_i2: "Every bottleneck ranked by what it costs you — in SAR and hours",
      offer2_i3: "A ready-to-use CRM + document checklist",
      offer2_i4: "The exact split: what to hand your team vs. hand to AI",
      offer2_i5: 'A 30-day plan you can run yourself',
      offer2_x1: 'No software setup at this stage',
      offer2_x2: "No training or migration — pure clarity",
      offer2_btn: 'Book your Snapshot',
      offer2_guarantee: "Zero-risk: if you don't walk away seeing exactly where you're losing money, pay nothing — and keep the entire plan anyway.",
      sar: 'SAR', sar2: 'SAR',
      offer3_tier: 'Step 3 — Build',
      offer3_price: 'Custom',
      offer3_t: "The Implementation Sprint",
      offer3_d: "We build the plan into your business — workflows live, tools set up, AI on the busywork, your team running it without you standing over them.",
      offer3_i1: "Every workflow in the plan — built, live, and in use",
      offer3_i2: "Your team trained on their real work, until it sticks",
      offer3_i3: "AI agents installed only where they earn their keep",
      offer3_btn: 'Talk to us first',
      offers_note: "We never take a cut of software. If a tool earns its place, we'll say so — and you pay the vendor directly.",
      quiz_kicker: 'Free Health Check',
      quiz_h2: "In 2 minutes, find out what your business is really costing you.",
      quiz_sub: "Answer 12 questions. Get your risk score, what the chaos costs you in SAR and hours every month, and the exact 3 moves to fix first — free.",
      quiz_btn: 'Show my diagnosis',
      quiz_advice_label: 'Your biggest risk',
      quiz_move_label: 'First move:',
      quiz_result_btn: 'Book the free 30-minute call',
      pa_tag: "If you're exploring",
      pa_name: "The Business X-Ray",
      pa_price: "Free",
      pa_desc: "A complete, no-obligation diagnosis of your business — delivered across two free calls.",
      pa_1: "Where your business leaks time and money — found and ranked in SAR and hours",
      pa_2: "Your whole operation mapped on one page",
      pa_3: "A clear 30-day action plan — yours to keep",
      pa_4: "What to hand your team vs. hand to AI",
      pa_5: "No pitch, no fee, no obligation",
      pa_btn: "Apply for your free X-Ray",
      pa_foot: "Best if you want proof before you commit.",
      pb_badge: "Done for you",
      pb_tag: "If you're ready to build",
      pb_name: "Systems Implementation",
      pb_price: "Custom scope",
      pb_desc: "We build the systems into your business and hand it over running — without you standing over it.",
      pb_1: "Your key workflows built, live, and in daily use",
      pb_2: "The right tools chosen and set up properly",
      pb_3: "AI agents handling the repetitive, low-value work",
      pb_4: "Your team trained on the real work, until it sticks",
      pb_5: "A short monthly rhythm so systems improve, not decay",
      pb_btn: "Book a call to scope it",
      pb_foot: "Not sure of scope or cost? We map it with you on the first call — free.",
      how_title: "How the free X-Ray works",
      nav_contact: "Contact",
      wa_widget_label: "Chat with us on WhatsApp",
      form_success: "Got it — we'll be in touch on WhatsApp shortly.",
      ph_business: "Business name",
      ph_message: "How can we help?",
      xray_kicker: "Start here",
      xray_h2: "Apply for your free Business X-Ray.",
      xray_sub: "We take a limited number of Saudi-based businesses each month. If you're a fit, you get a complete diagnosis of your business — leaks, bottlenecks, and a 30-day plan — for free. No pitch, no fee, no obligation.",
      xray_step1_t: "Apply in 60 seconds",
      xray_step1_p: "Tell us your name, business, WhatsApp, and your single biggest headache. We only take businesses we can genuinely help.",
      xray_step2_t: "Free call — the diagnosis",
      xray_step2_p: "A focused 30 minutes. We dig into how your business really runs, find where it leaks time and money, and see if we're a fit.",
      xray_step3_t: "Free call — your report",
      xray_step3_p: "We come back with your full report: leaks ranked by cost, your operation on one page, and a 30-day plan — yours to keep.",
      xray_step4_t: "Build it — only if you want",
      xray_step4_p: "Love the plan? Move straight into Implementation. Only if you want it.",
      xray_stack_title: "What you walk away with — all free:",
      xray_stack_1: "A full diagnosis of where your business leaks time and money",
      xray_stack_2: "Your bottlenecks ranked by what they cost you — in SAR and hours",
      xray_stack_3: "Your entire operation mapped on one page",
      xray_stack_4: "The exact split: what to hand your team vs. hand to AI",
      xray_stack_5: "A 30-day action plan you can run yourself",
      xray_stack_6: "A starter CRM + document checklist",
      xray_guarantee: "Worst case, you walk away seeing your business more clearly than most owners ever do. Best case, we fix it together.",
      xray_btn: "Apply for your free Business X-Ray",
      xray_note: "Booked through Calendly. After you book, we'll send a couple of quick questions on WhatsApp so we come prepared.",
      news_kicker: "Stay sharp",
      news_h2: "One systems tip a week — in Arabic and English.",
      news_sub: "Practical ways to make your business run without you. No spam. Unsubscribe anytime.",
      news_btn: "Join free",
      contact_title: "Contact — Green Oaisys",
      contact_h1: "Talk to us.",
      contact_sub: "A question, a project, or just exploring? Send a message or reach us on WhatsApp — we reply fast.",
      contact_form_h: "Send us a message",
      contact_btn: "Send message",
      contact_or: "or",
      contact_wa_btn: "Chat on WhatsApp",
      contact_email_btn: "Email us",
      contact_email_label: "Email",
      contact_back: "← Back to home",
      offer1_i4: "A personalized report, yours to keep — no call required",
      offer2_anchor: "Most owners find one leak that pays this back many times over — in the first session.",
      offer3_i4: "Your 500 SAR Snapshot fee credited back in full",
      ctx_title: "Two quick things, so we can size your leaks in real numbers:",
      ctx_team_label: "Team size",
      ctx_team_1: "Just me / 1–3",
      ctx_team_2: "4–10",
      ctx_team_3: "11–30",
      ctx_team_4: "30+",
      ctx_rev_label: "Monthly revenue (SAR)",
      ctx_rev_1: "Under 100k",
      ctx_rev_2: "100k – 500k",
      ctx_rev_3: "500k – 1M",
      ctx_rev_4: "1M+",
      ctx_hours_label: "Hours a week you spend firefighting",
      ctx_hours_1: "Under 5",
      ctx_hours_2: "5–15",
      ctx_hours_3: "15–30",
      ctx_hours_4: "30+",
      gate_eyebrow: "Your full diagnosis is ready",
      gate_title: "Unlock your complete leak report — free",
      gate_l1: "What the chaos is costing you — estimated SAR and hours every month",
      gate_l2: "A deep read on all 4 systems, not just your worst one",
      gate_l3: "Your ranked 30-day action plan — 3 moves, in order",
      gate_l4: "How you compare to other Saudi owners",
      gate_l5: "A report you can download and keep",
      gate_send: "Send my code on WhatsApp",
      gate_fine: "One code to verify it's you. No spam, no sharing your number.",
      ph_name: "Your name",
      ph_email: "Email",
      ph_wa: "WhatsApp (e.g. +9665XXXXXXXX)",
      otp_eyebrow: "Check your WhatsApp",
      otp_title: "Enter the 6-digit code",
      otp_sub: "We sent a code to your WhatsApp number.",
      otp_verify: "Verify & unlock report",
      otp_resend: "Resend code",
      err_name: "Please enter your name.",
      err_email: "Please enter a valid email.",
      err_wa: "Enter your WhatsApp number with country code, e.g. +9665XXXXXXXX.",
      err_otp: "That code doesn't match. Check your WhatsApp and try again.",
      otp_sent_mask: "We sent a 6-digit code to {wa}.",
      otp_test_note: "Test mode — your code is {code} (real codes arrive on WhatsApp once connected).",
      deep_cost_eyebrow: "What the chaos is costing you",
      deep_cost_money: "lost every month (estimate)",
      deep_cost_hours: "of your time, every month",
      deep_cost_year: "a year, if nothing changes",
      deep_cost_note: "An estimate based on your revenue, team size, and answers — most owners find the real number is higher once we map it.",
      deep_areas_eyebrow: "Your 4 systems, in depth",
      deep_plan_eyebrow: "Your 30-day action plan",
      deep_plan_intro: "Do these in order. Each one takes the pressure off the next.",
      deep_move_label: "Move",
      deep_hours_unit: "hrs",
      deep_cta_h: "Want us to find the leaks you can't see — and hand you the fix?",
      deep_cta_p: "Your free audit shows the symptoms. The Snapshot maps the exact causes and hands you a plan — zero-risk, or you keep it free.",
      deep_download: "Download my report",
      deep_bench_tmpl: "You scored higher-risk than about {pct}% of owners who took this — and every point is fixable.",
      report_title: "Your Business Leak Report — Green Oaisys",
      founders_kicker: "About Green Oaisys",
      founders_h2: "One belief: great businesses run on systems, not heroics.",
      founders_sub: 'We bring big-company operating discipline to Saudi-based SMEs — making work visible, giving it owners and standards, and putting AI on the repetition. So the business runs, grows, and holds value on its own.',
      mvv1_t: 'Our vision', mvv1_p: 'A culture of systems excellence in every Saudi-based SME.',
      mvv2_t: 'Our mission', mvv2_p: 'Turn founder memory, chat chaos, and repeated work into clear systems the team runs.',
      mvv3_t: 'Our values', mvv3_p: 'Clarity before tools. Ownership before automation. Adoption before expansion.',
      founder1_role: 'Co-founder',
      founder1_bio: "Muhammad builds growth machines. Careem, Keeta, and a career across operations, sales, and marketing taught him one thing: leading businesses aren't run by heroes — they're run by systems. Now he builds them for Saudi-based SMEs.",
      founder2_role: 'Co-founder',
      founder2_bio: 'Mohamed lives where the work happens. Years across communications, customer experience, and business development made him fluent in the messy reality of daily operations — and relentless about simplifying it.',
      cta_h2: 'See exactly where your business leaks.',
      cta_p: "Book a free 30-minute call. We'll pinpoint where your business leaks time, money, and owner energy — and what to fix first. No pitch, no jargon.",
      cta_btn1: 'Book the free call',
      cta_btn2: "See how it works",
      cta_line: 'Big-company operating discipline, in small-company hands.',
      cta_contact: 'Or write to us: <a href="mailto:hello@greenoaisys.com">hello@greenoaisys.com</a>',
      footer_tag: 'Turning Saudi-based businesses into brands — one system at a time.',
      doc_title: 'Green Oaisys — Systems that run your business, so it stops running on you',
      toggle_label: 'العربية'
    },

    ar: {
      nav_brand: 'لماذا الأنظمة؟',
      nav_method: 'منهجيتنا',
      nav_offers: 'خدماتنا',
      nav_about: 'من نحن',
      nav_cta: "احجز فحص منشأتك المجاني",
      hero_kicker: 'من منشأة… إلى علامة تجارية',
      hero_h1: 'نبني <span class="accent">الأنظمة</span> اللي تشغّل منشأتك.',
      hero_sub: 'انضباط الشركات الكبرى، بين يدي منشأتك — عشان شغلك:',
      hero_b1: 'يمشي بدون ما يحتاجك كل ساعة',
      hero_b2: 'يكبر من منشأة إلى علامة تجارية',
      hero_b3: 'له قيمة حقيقية تكبر مع الوقت',
      hero_cta1: "قدّم على فحص منشأتك المجاني",
      hero_cta2: 'احجز مكالمة مجانية (30 دقيقة)',
      chat1: 'أستاذ، العميل يسأل عن السعر… وش أرد عليه؟',
      chat2: 'أي نسخة من العقد هي الأخيرة؟ 🤔',
      chat3: 'سارة اليوم إجازة… من يعرف طريقة التجديد غيرها؟',
      chat4: 'نحتاج موافقتك على هذا… وهذا… وهذي الثلاثة بعد 🙏',
      clarity_title: 'المهام النشطة — اليوم',
      clarity1: 'عميل جديد — بدأت قائمة الاستقبال',
      clarity2: 'تجديد — أُرسل التذكير وبانتظار السداد',
      clarity3: 'عرض سعر — من جدول الأسعار مباشرة',
      owner1: 'سارة', owner2: 'أحمد', owner3: 'سارة',
      vision_label: 'رؤيتنا',
      vision_text: 'ثقافة التميّز التشغيلي في كل منشأة في السعودية.',
      wwd_kicker: 'ماذا نقدّم',
      wwd_h2: 'ما نبيع برامج. نبني طريقة شغل منشأتك.',
      wwd_sub: 'شغلك اليومي يصير واضح، له مالك، ويتكرر بنفس الجودة. الآلة تاخذ التكرار، وفريقك ياخذ المسؤولية، وأنت يرجع لك وقتك.',
      pillar1_t: 'كل الشغل قدامك',
      pillar1_p: 'قائمة وحدة حيّة لكل اللي يصير في منشأتك، ومسار واضح من بداية الشغلة لين تخلص. وداعًا لسؤال «وين وصلنا؟»',
      pillar2_t: 'فوّض وأنت مرتاح',
      pillar2_p: 'كل مهمة لها مالك واحد وقائمة تحقق واضحة. سلّم الشغل لفريقك — وخلّ بالك مرتاح.',
      pillar3_t: 'أنظمة تعيش وتتطور',
      pillar3_p: 'نحط الأنظمة داخل الأدوات اللي يستخدمها فريقك أصلًا، ونراجعها بإيقاع ثابت — عشان تتحسن مع الوقت، مو تنحط على الرف.',
      ai_title: 'لوجود «<em>ai</em>» في اسمنا سبب.',
      ai_intro: 'الذكاء الاصطناعي يعيد رسم المنافسة، واللي يتبنّاه بدري يسبق الكل. نختار لمنشأتك الأدوات الصح، نجهزها لك كاملة، وندرّب فريقك عليها لين يستخدمها بكل ثقة.',
      ai1_t: 'فريقك يتقن الذكاء الاصطناعي',
      ai1_p: 'ندرّب موظفيك على شغلهم الفعلي، لين يصير استخدام الذكاء الاصطناعي عندهم بسهولة الواتساب.',
      ai2_t: 'الشغل المتكرر على الذكاء الاصطناعي',
      ai2_p: 'وكلاء الذكاء الاصطناعي يتولون الصياغة وإدخال البيانات والتذكير بالمتابعات — وفريقك يتفرغ للمهام الأعلى قيمة: اللي تحتاج تفكير وقرار.',
      ai3_t: 'ردود لعملائك بدقائق',
      ai3_p: 'كل استفسار يوصله رد سريع ومرتب، بأي وقت — بأسلوب منشأتك وقواعدها.',
      ai4_t: 'بس اللي يفيد',
      ai4_p: 'إحنا انتقائيون: إذا ما خلّى الذكاء الاصطناعي المهمة أسرع أو أفضل، نستغني عنه.',
      brand_kicker: 'منشأة… أم علامة تجارية؟',
      brand_h2: 'الفرق بين المنشأة والعلامة التجارية؟ الأنظمة.',
      brand_sub: 'العلامة التجارية مو شعار، هي منشأة تقدم نفس الإتقان كل مرة — سواء حضر المالك أو لا. والأنظمة هي السر: هي اللي تفتح لك الفرع الثاني، وتجيب لك العميل الأكبر، وتخلي المشتري يدفع أكثر.',
      value1_t: 'وقتك يرجع لك',
      value1_p: 'فريقك يدير الشغل اليومي وأنت تدير الاتجاه. وأخيرًا — إجازة حقيقية.',
      value2_t: 'نموّ يزيد الربح لا العبء',
      value2_p: 'لما يصير الشغل قابل للتكرار، كل عميل جديد يزيد دخلك — مو ساعات عملك.',
      value3_t: 'سمعة تصنع نفسها',
      value3_p: 'العملاء يرجعون للجودة الثابتة مو للحظ. وهذا اللي يحوّل الاسم إلى علامة.',
      value4_t: 'منشأة تستحق أن تُشترى',
      value4_p: 'العمليات الموثّقة القابلة للنقل هي ما يدفع مقابله المستثمرون والبنوك فعلًا.',
      saudi_line: 'جيل جديد من روّاد الأعمال في السعودية يبني علامات تجارية، مو بس منشآت — والأنظمة هي الطريق.',
      method_kicker: 'كيف نعمل',
      method_h2: 'منهجية الوضوح التشغيلي',
      method_sub: 'ثماني خطوات تحوّل فوضى اليوم إلى آلة منتظمة — مسار واحد كل مرة. بدون تغيير جذري مربك، وبدون أدلة من 40 صفحة.',
      step1_t: 'تشخيص الفوضى', step1_p: 'نحدد أين يتسرب الوقت والمال وطاقتك.',
      step2_t: 'رسم المسار الحرج', step2_p: 'مسار واحد عالي الأثر، من بدايته إلى تمامه.',
      step3_t: 'تحديد الملكية', step3_p: 'قرارات واضحة وتسليم واضح — وداعًا لعبارة «حسبتها عندك».',
      step4_t: 'تبسيط العمل', step4_p: 'نحذف وندمج قبل أن نوثّق أي شيء.',
      step5_t: 'بناء ما يُستخدم فعلًا', step5_p: 'قوائم تحقق وقوالب مختصرة — لا مجلدات تُنسى.',
      step6_t: 'التركيب داخل أدوات فريقك', step6_p: 'داخل الأدوات التي يفتحها فريقك يوميًا — مع وكلاء ذكاء اصطناعي للمهام المتكررة.',
      step7_t: 'التدريب والتسليم', step7_p: 'فريقك يدير النظام، وأنت تخرج من دور المنقذ.',
      step8_t: 'المراجعة والتحسين', step8_p: 'إيقاع شهري خفيف يبقي النظام حيًا ويطوّره.',
      offers_kicker: "طريقتان للبداية",
      offers_h2: "اختر نقطة انطلاقك.",
      offers_sub: "لسّا تستكشف؟ ابدأ بتشخيص مجاني. جاهز تتحرّك؟ نبدأ البناء فورًا.",
      offer1_tier: 'الخطوة الأولى — مجانًا',
      offer1_t: "فحص تسريبات منشأتك في دقيقتين",
      offer1_price: 'مجانًا',
      offer1_d: "جاوب على 12 سؤال، وتطلع بتشخيص كامل: وين تتسرب منك الوقت والفلوس وراحتك — وبأي ترتيب تصلحها.",
      offer1_i1: "درجة خطورة عبر الأنظمة الأربعة اللي تبني المنشأة أو تهدّها",
      offer1_i2: "تسريباتك بأرقام حقيقية — بالريال والساعات أسبوعيًا",
      offer1_i3: "خطة من 3 خطوات مرتّبة تبدأ فيها هذا الأسبوع",
      offer1_btn: "احصل على تشخيصي المجاني",
      offer2_badge: 'الأكثر طلبًا',
      offer2_tier: 'الخطوة الثانية — التشخيص',
      offer2_t: "تشخيص الأنظمة (Snapshot)",
      offer2_d: "جلسة واحدة مركّزة: نرسم كيف تشتغل منشأتك بالضبط، ونلقى وين تهرب الفلوس، ونسلّمك الحل — لك، سواء كملت معنا أو لا.",
      offer2_i1: "عملياتك كاملة في صفحة واحدة",
      offer2_i2: "كل اختناق مرتّب حسب كلفته عليك — بالريال والساعات",
      offer2_i3: "قالب CRM جاهز وقائمة مستندات",
      offer2_i4: "التقسيم بالضبط: وش تسنده لفريقك ووش تسنده للذكاء الاصطناعي",
      offer2_i5: 'خطة عمل لثلاثين يومًا تنفذها بنفسك',
      offer2_x1: 'لا يشمل إعداد البرامج في هذه المرحلة',
      offer2_x2: "لا تدريب ولا نقل بيانات — وضوح خالص",
      offer2_btn: 'احجز التشخيص',
      offer2_guarantee: "بلا مخاطرة: إذا ما طلعت وأنت شايف بالضبط وين تخسر فلوسك، ما تدفع شي — وتحتفظ بالخطة كاملة.",
      sar: 'ريال', sar2: 'ريال',
      offer3_tier: 'الخطوة الثالثة — البناء',
      offer3_price: 'حسب النطاق',
      offer3_t: "سبرنت التنفيذ",
      offer3_d: "نبني الخطة داخل منشأتك — مسارات عمل شغّالة، وأدوات جاهزة، وذكاء اصطناعي على الأعمال المتكررة، وفريق يشغّلها بدونك.",
      offer3_i1: "كل مسار في الخطة — مبني وشغّال ومُستخدَم",
      offer3_i2: "فريقك مدرّب على شغله الحقيقي، لين يثبت",
      offer3_i3: "وكلاء ذكاء اصطناعي حيث يستحقون فقط",
      offer3_btn: 'تحدث معنا أولًا',
      offers_note: 'ما ناخذ عمولة من أي برنامج. إذا كانت الأداة تستاهل، نقولها — وتدفع قيمتها للمزوّد مباشرة.',
      quiz_kicker: 'الفحص المجاني',
      quiz_h2: "في دقيقتين، اعرف كم تكلّفك منشأتك فعلًا.",
      quiz_sub: "جاوب على 12 سؤال، وتطلع بدرجة خطورتك، وكم تكلّفك الفوضى بالريال والساعات شهريًا، وأهم 3 خطوات تبدأ فيها — مجانًا.",
      quiz_btn: 'أظهر النتيجة',
      quiz_advice_label: 'أكبر خطر لديك',
      quiz_move_label: 'ابدأ من هنا:',
      quiz_result_btn: 'احجز المكالمة المجانية (30 دقيقة)',
      pa_tag: "إذا كنت تستكشف",
      pa_name: "فحص منشأتك (Business X-Ray)",
      pa_price: "مجانًا",
      pa_desc: "تشخيص كامل لمنشأتك بلا التزام — عبر مكالمتين مجانيتين.",
      pa_1: "وين تتسرب منك الوقت والفلوس — محدّد ومرتّب بالريال والساعات",
      pa_2: "عملياتك كاملة في صفحة واحدة",
      pa_3: "خطة واضحة لثلاثين يومًا — لك تحتفظ فيها",
      pa_4: "وش تسنده لفريقك ووش للذكاء الاصطناعي",
      pa_5: "بلا عرض بيعي، بلا رسوم، بلا التزام",
      pa_btn: "قدّم على فحصك المجاني",
      pa_foot: "الأنسب إذا تبي دليل قبل ما تلتزم.",
      pb_badge: "ننفّذه لك",
      pb_tag: "إذا كنت جاهز للبناء",
      pb_name: "تنفيذ الأنظمة",
      pb_price: "حسب النطاق",
      pb_desc: "نبني الأنظمة داخل منشأتك ونسلّمها وهي شغّالة — بدون ما تقف عليها.",
      pb_1: "مسارات عملك الأساسية مبنية وشغّالة ومُستخدَمة يوميًا",
      pb_2: "الأدوات الصحيحة مختارة ومجهّزة صح",
      pb_3: "وكلاء ذكاء اصطناعي يتكفّلون بالعمل المتكرر منخفض القيمة",
      pb_4: "فريقك مدرّب على الشغل الحقيقي لين يثبت",
      pb_5: "إيقاع شهري قصير عشان الأنظمة تتحسّن ما تتلاشى",
      pb_btn: "احجز مكالمة لتحديد النطاق",
      pb_foot: "مو متأكد من النطاق أو التكلفة؟ نحددها معك في أول مكالمة — مجانًا.",
      how_title: "كيف يشتغل الفحص المجاني",
      nav_contact: "تواصل معنا",
      wa_widget_label: "تواصل معنا على واتساب",
      form_success: "وصلنا طلبك — بنتواصل معك على واتساب قريبًا.",
      ph_business: "اسم المنشأة",
      ph_message: "كيف نقدر نساعدك؟",
      xray_kicker: "ابدأ من هنا",
      xray_h2: "قدّم على فحص منشأتك المجاني (Business X-Ray).",
      xray_sub: "نستقبل عددًا محدودًا من المنشآت في السعودية كل شهر. إذا كنت مناسبًا، تحصل على تشخيص كامل لمنشأتك — التسريبات والاختناقات وخطة 30 يوم — مجانًا. بلا عرض بيعي، بلا رسوم، بلا التزام.",
      xray_step1_t: "قدّم في 60 ثانية",
      xray_step1_p: "عطنا اسمك واسم منشأتك ورقم واتساب وأكبر صداع يواجهك. ما ناخذ إلا المنشآت اللي نقدر نساعدها فعلًا.",
      xray_step2_t: "مكالمة مجانية — التشخيص",
      xray_step2_p: "٣٠ دقيقة مركّزة. نغوص في كيف تشتغل منشأتك فعلًا، ونلقى وين تتسرب الوقت والفلوس، ونشوف هل نحن مناسبون لك.",
      xray_step3_t: "مكالمة مجانية — تقريرك",
      xray_step3_p: "نرجع لك بتقريرك الكامل: التسريبات مرتّبة حسب كلفتها، وعملياتك في صفحة واحدة، وخطة 30 يوم — لك تحتفظ فيها.",
      xray_step4_t: "التنفيذ — فقط لو رغبت",
      xray_step4_p: "عجبتك الخطة؟ ننتقل مباشرة إلى التنفيذ. فقط لو رغبت.",
      xray_stack_title: "اللي تطلع فيه — كله مجانًا:",
      xray_stack_1: "تشخيص كامل لوين تتسرب منك الوقت والفلوس",
      xray_stack_2: "اختناقاتك مرتّبة حسب كلفتها — بالريال والساعات",
      xray_stack_3: "عملياتك كاملة في صفحة واحدة",
      xray_stack_4: "التقسيم بالضبط: وش لفريقك ووش للذكاء الاصطناعي",
      xray_stack_5: "خطة عمل لثلاثين يومًا تنفّذها بنفسك",
      xray_stack_6: "قالب CRM جاهز وقائمة مستندات",
      xray_guarantee: "أسوأ حالة: تطلع وأنت شايف منشأتك أوضح من أغلب الملاك. أفضل حالة: نصلحها سوا.",
      xray_btn: "قدّم على فحص منشأتك المجاني",
      xray_note: "الحجز عبر Calendly. بعد الحجز نرسل لك أسئلة سريعة على واتساب عشان نجي مستعدين.",
      news_kicker: "خلّك في الصورة",
      news_h2: "نصيحة أنظمة كل أسبوع — بالعربي والإنجليزي.",
      news_sub: "طرق عملية تخلّي منشأتك تشتغل بدونك. بلا إزعاج، وتقدر تلغي الاشتراك وقت ما تبي.",
      news_btn: "اشترك مجانًا",
      contact_title: "تواصل معنا — غرين أويسِس",
      contact_h1: "كلّمنا.",
      contact_sub: "عندك سؤال أو مشروع أو بس تستكشف؟ أرسل رسالة أو تواصل معنا على واتساب — نرد بسرعة.",
      contact_form_h: "أرسل لنا رسالة",
      contact_btn: "إرسال الرسالة",
      contact_or: "أو",
      contact_wa_btn: "تواصل على واتساب",
      contact_email_btn: "راسلنا بالإيميل",
      contact_email_label: "البريد",
      contact_back: "← الرجوع للرئيسية",
      offer1_i4: "تقرير مخصّص لك، تحتفظ فيه — بدون أي مكالمة",
      offer2_anchor: "أغلب الملاك يلقون تسريبًا واحدًا يرجّع هذي التكلفة أضعافًا — من أول جلسة.",
      offer3_i4: "ونخصم رسوم التشخيص (500 ريال) كاملة من القيمة",
      ctx_title: "شيئان سريعان، عشان نحسب تسريباتك بأرقام حقيقية:",
      ctx_team_label: "حجم الفريق",
      ctx_team_1: "أنا فقط / 1–3",
      ctx_team_2: "4–10",
      ctx_team_3: "11–30",
      ctx_team_4: "30+",
      ctx_rev_label: "الإيراد الشهري (ريال)",
      ctx_rev_1: "أقل من 100 ألف",
      ctx_rev_2: "100–500 ألف",
      ctx_rev_3: "500 ألف – مليون",
      ctx_rev_4: "مليون+",
      ctx_hours_label: "ساعات إطفاء الحرائق أسبوعيًا",
      ctx_hours_1: "أقل من 5",
      ctx_hours_2: "5–15",
      ctx_hours_3: "15–30",
      ctx_hours_4: "30+",
      gate_eyebrow: "تشخيصك الكامل جاهز",
      gate_title: "افتح تقرير التسريبات الكامل — مجانًا",
      gate_l1: "كم تكلّفك الفوضى — تقدير بالريال والساعات شهريًا",
      gate_l2: "قراءة عميقة للأنظمة الأربعة، مو أسوأ واحد فقط",
      gate_l3: "خطة عملك لثلاثين يومًا — 3 خطوات بالترتيب",
      gate_l4: "كيف تقارن بأصحاب المنشآت الآخرين",
      gate_l5: "تقرير تقدر تحمّله وتحتفظ فيه",
      gate_send: "أرسل الرمز على واتساب",
      gate_fine: "رمز واحد نتأكد فيه إنه أنت. بلا إزعاج، وما نشارك رقمك.",
      ph_name: "اسمك",
      ph_email: "البريد الإلكتروني",
      ph_wa: "واتساب (مثال: +9665XXXXXXXX)",
      otp_eyebrow: "افتح واتساب",
      otp_title: "أدخل الرمز المكوّن من 6 أرقام",
      otp_sub: "أرسلنا رمزًا إلى رقم واتساب.",
      otp_verify: "تحقّق وافتح التقرير",
      otp_resend: "إعادة إرسال الرمز",
      err_name: "رجاءً اكتب اسمك.",
      err_email: "رجاءً اكتب بريدًا صحيحًا.",
      err_wa: "اكتب رقم واتساب مع رمز الدولة، مثال: +9665XXXXXXXX.",
      err_otp: "الرمز غير مطابق. راجع واتساب وحاول مرة ثانية.",
      otp_sent_mask: "أرسلنا رمزًا من 6 أرقام إلى {wa}.",
      otp_test_note: "وضع تجريبي — رمزك هو {code} (تصل الرموز الحقيقية عبر واتساب بعد الربط).",
      deep_cost_eyebrow: "كم تكلّفك الفوضى",
      deep_cost_money: "تخسرها شهريًا (تقدير)",
      deep_cost_hours: "من وقتك، كل شهر",
      deep_cost_year: "سنويًا، لو ما تغيّر شي",
      deep_cost_note: "تقدير مبني على إيرادك وحجم فريقك وإجاباتك — وغالبًا الرقم الحقيقي أكبر لما نرسم العمليات.",
      deep_areas_eyebrow: "أنظمتك الأربعة بالتفصيل",
      deep_plan_eyebrow: "خطة عملك لثلاثين يومًا",
      deep_plan_intro: "نفّذها بالترتيب. كل خطوة تخفف الضغط عن اللي بعدها.",
      deep_move_label: "خطوة",
      deep_hours_unit: "ساعة",
      deep_cta_h: "تبي نلقى لك التسريبات اللي ما تشوفها — ونعطيك الحل؟",
      deep_cta_p: "الفحص المجاني يوريك الأعراض. التشخيص (Snapshot) يرسم الأسباب بالضبط ويعطيك خطة — بلا مخاطرة، أو تحتفظ فيها مجانًا.",
      deep_download: "حمّل تقريري",
      deep_bench_tmpl: "خطورتك أعلى من حوالي {pct}% ممن أجابوا هذا الفحص — وكل نقطة قابلة للإصلاح.",
      report_title: "تقرير تسريبات منشأتك — غرين أويسِس",
      founders_kicker: 'عن غرين أويسِس',
      founders_h2: 'قناعة واحدة: الشركات الرائدة تقوم على أنظمة، مو على أبطال.',
      founders_sub: 'جينا عشان نحط انضباط الشركات الكبرى بين يدي المنشآت في السعودية: نخلي الشغل مرئي، له مالك ومعيار، ونعطي التكرار للذكاء الاصطناعي — عشان منشأتك تشتغل وتكبر ويصير لها قيمة حقيقية.',
      mvv1_t: 'رؤيتنا', mvv1_p: 'ثقافة تميّز تشغيلي في كل منشأة في السعودية.',
      mvv2_t: 'رسالتنا', mvv2_p: 'نحوّل ذاكرة المؤسس وفوضى المحادثات والشغل المتكرر إلى أنظمة واضحة يديرها الفريق.',
      mvv3_t: 'قيمنا', mvv3_p: 'نبدأ بالوضوح قبل شراء الأدوات، ونحدد المسؤول قبل الأتمتة، ونتأكد إن الفريق يستخدم النظام قبل ما نتوسع.',
      founder1_role: 'شريك مؤسس',
      founder1_bio: 'محمد يبني محركات النمو: كريم، كيتا، ومسيرة في العمليات والمبيعات والتسويق علّمته درس واحد — الشركات الرائدة ما يديرها أبطال، تديرها أنظمة. واليوم يبنيها للمنشآت في السعودية.',
      founder2_role: 'شريك مؤسس',
      founder2_bio: 'محمد يعيش وسط الشغل: سنوات في التواصل وتجربة العملاء وتطوير الأعمال خلّته يفهم تفاصيل التشغيل اليومي بكل فوضاه — ويصر على تبسيطها.',
      cta_h2: 'اعرف وين يتسرب شغلك — بالضبط.',
      cta_p: 'احجز مكالمة مجانية 30 دقيقة، نحدد فيها وين يروح الوقت والفلوس والجهد من منشأتك، ووش تصلح أول. بلا عرض مبيعات، وبلا تعقيد.',
      cta_btn1: 'احجز المكالمة المجانية',
      cta_btn2: "شوف كيف تشتغل",
      cta_line: 'انضباط الشركات الكبرى… بين يدي المنشآت الصغيرة.',
      cta_contact: 'أو راسلنا: <a href="mailto:hello@greenoaisys.com">hello@greenoaisys.com</a>',
      footer_tag: 'أنظمة تصنع من منشآت اليوم علامات الغد.',
      doc_title: 'غرين أويسِس | أنظمة عمل للمنشآت في السعودية',
      toggle_label: 'English'
    }
  };

  /* ============ Health Check quiz ============ */
  const QUIZ = {
    en: [
      'Client details and approvals live in WhatsApp threads',
      'Follow-ups happen only if someone remembers',
      'Only I can set prices or approve exceptions',
      "There's no single list of everything in progress",
      "I can't quickly see who's paid and who hasn't",
      "New hires need months before they're useful",
      'Quality depends on who does the work',
      "If my key person quit tomorrow, we'd be in trouble",
      'We pay for tools, but the real work happens in chats',
      'Marketing only happens in quiet weeks',
      "I can't take a full week off without daily check-ins",
      'If I sold the business tomorrow, the buyer would be buying… me'
    ],
    ar: [
      'بيانات العملاء والموافقات كلها داخل محادثات واتساب',
      'المتابعات ما تصير إلا إذا أحد تذكرها',
      'ما أحد يحدد الأسعار أو يوافق على الاستثناءات غيري',
      'لا توجد قائمة واحدة تجمع كل الأعمال الجارية',
      'ما أعرف بسرعة مين سدّد ومين لا',
      'الموظف الجديد ياخذ شهور قبل ما ينتج',
      'الجودة تختلف باختلاف من ينفّذ العمل',
      'لو استقال موظفي الأهم بكرة نتورط',
      'ندفع اشتراكات أدوات، والعمل الفعلي يُدار في المحادثات',
      'التسويق ما يتحرك إلا بالأسابيع الهادية',
      'ما أقدر أغيب أسبوع كامل بدون متابعة يومية',
      'لو عرضت منشأتي للبيع بكرة… قيمتها كلها مرتبطة فيني أنا'
    ]
  };

  // Four diagnostic areas (indexes into QUIZ)
  const AREAS = [
    { id: 'owner',      items: [2, 10, 11] },
    { id: 'visibility', items: [0, 3, 4, 8] },
    { id: 'revenue',    items: [1, 9] },
    { id: 'knowledge',  items: [5, 6, 7] }
  ];

  const AREA_TEXT = {
    en: {
      owner:      { name: 'Owner dependency',        insight: 'Too many decisions still route through you. Every one of them is a queue.', move: 'Pick the decision you make most often. Write the rule behind it. Hand it to one person this week.' },
      visibility: { name: 'Work visibility',          insight: "Work is happening — but nobody can see it in one place. Invisible work can't be managed, only chased.", move: 'Put every active job on one list this week. A simple sheet beats a perfect tool.' },
      revenue:    { name: 'Revenue follow-through',   insight: 'Leads and renewals are slipping through unwatched gaps. That is money already earned, quietly lost.', move: 'Pull the last 90 days of leads and renewals. Chase every silent one today.' },
      knowledge:  { name: 'Knowledge & consistency',  insight: "Your standards live in people's heads — and people leave.", move: 'Document your single most critical process this week, in ten steps or fewer.' }
    },
    ar: {
      owner:      { name: 'الاعتماد على المالك', insight: 'قرارات كثيرة ما تزال تمرّ عبرك أنت، وكل قرار منها طابور انتظار.', move: 'اختر أكثر قرار يتكرر عليك، واكتب القاعدة التي تحكمه، وسلّمه لشخص واحد هذا الأسبوع.' },
      visibility: { name: 'وضوح العمل', insight: 'العمل يجري فعلًا، لكن لا أحد يراه مجتمعًا في مكان واحد — والعمل غير المرئي يُلاحَق ولا يُدار.', move: 'اجمع كل الأعمال الجارية في قائمة واحدة هذا الأسبوع؛ جدول بسيط يكفي.' },
      revenue:    { name: 'متابعة الإيرادات', insight: 'عملاء محتملون وتجديدات تتسرب من فجوات لا يراقبها أحد — مال كسبته ثم ضاع بصمت.', move: 'راجع عملاءك المحتملين وتجديداتك في آخر تسعين يومًا، وتواصل اليوم مع كل من انقطع.' },
      knowledge:  { name: 'المعرفة والاتساق', insight: 'معاييرك محفوظة في رؤوس موظفيك — والموظفون يرحلون.', move: 'وثّق هذا الأسبوع أهم عملية واحدة في منشأتك، في عشر خطوات أو أقل.' }
    }
  };

  const RESULTS = {
    en: {
      calm:     { cls: 'calm',     title: 'Running on rails', text: 'Your foundations are solid — rarer than you think. A light monthly review will keep you ahead of the pack.' },
      friction: { cls: 'friction', title: 'Leaking, quietly', text: 'Time and money are slipping out every week, and the business still needs you too much. Start with the risk area below.' },
      chaos:    { cls: 'chaos',    title: 'Held together by you', text: 'Right now, you are the system. The fix is not working harder — start with the risk area below, one workflow at a time.' }
    },
    ar: {
      calm:     { cls: 'calm',     title: 'منشأتك ماشية على السكة', text: 'أساساتك متينة — وهذا أندر مما تتوقع. مراجعة شهرية خفيفة تخليك قدّام.' },
      friction: { cls: 'friction', title: 'تسريب صامت', text: 'وقت وفلوس تتسرب كل أسبوع، وقيمة منشأتك مرتبطة فيك شخصيًا. ابدأ بمنطقة الخطر اللي تحت.' },
      chaos:    { cls: 'chaos',    title: 'كل شي واقف عليك', text: 'أنت النظام في منشأتك حاليًا، والحل مو شغل أكثر — نظام واحد كل مرة. ابدأ بمنطقة الخطر اللي تحت.' }
    }
  };

  /* ============ Marquee phrases ============ */
  const MARQUEE = {
    en: [
      'Take a full week off',
      "Know who's paid — instantly",
      'Same quality, whoever does the work',
      'New hires productive in weeks, not months',
      'Follow-ups that never slip',
      'Growth without burning out'
    ],
    ar: [
      'إجازة كاملة بدون مكالمات',
      'اعرف مين سدّد ومين لا — بلحظة',
      'نفس الجودة مهما تغيّر اللي يشتغل',
      'موظف جديد ينتج بأسابيع مو شهور',
      'متابعات ما يطيح منها شي',
      'نموّ بلا إنهاك'
    ]
  };

  /* ============ State ============ */
  let lang = 'en';
  try {
    const saved = localStorage.getItem('go-lang');
    if (saved === 'ar' || saved === 'en') lang = saved;
  } catch (e) { /* private mode — ignore */ }

  /* ============ i18n application ============ */
  function setText(el, str) {
    if (el.firstChild && el.firstChild.nodeType === Node.TEXT_NODE && el.children.length > 0) {
      el.firstChild.nodeValue = str;
    } else {
      el.textContent = str;
    }
  }

  function applyLang() {
    const dict = I18N[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    const titleKey = document.documentElement.getAttribute('data-title-key') || 'doc_title';
    document.title = dict[titleKey] || dict.doc_title;

    document.querySelectorAll('[data-i18n], [data-i18n-html]').forEach(function (el) {
      const key = el.getAttribute('data-i18n') || el.getAttribute('data-i18n-html');
      if (!(key in dict)) return;
      if (HTML_KEYS.has(key)) {
        el.innerHTML = dict[key];
      } else {
        setText(el, dict[key]);
      }
    });

    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-ph');
      if (key in dict) el.setAttribute('placeholder', dict[key]);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-aria');
      if (key in dict) el.setAttribute('aria-label', dict[key]);
    });

    const toggle = document.getElementById('langToggle');
    toggle.textContent = dict.toggle_label;
    toggle.setAttribute('aria-label', lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');

    renderQuiz();
    renderMarquee();
    if (typeof initWhatsApp === 'function') initWhatsApp();
    if (lastReport) { renderTeaser(lastReport); if (reportUnlocked) renderDeep(lastReport); }
    try { localStorage.setItem('go-lang', lang); } catch (e) { /* ignore */ }
  }

  /* ============ Marquee ============ */
  function renderMarquee() {
    const track = document.getElementById('marqueeTrack');
    if (!track) return;
    track.innerHTML = '';
    for (let r = 0; r < 2; r++) {
      MARQUEE[lang].forEach(function (phrase) {
        const s = document.createElement('span');
        s.textContent = phrase;
        const star = document.createElement('span');
        star.className = 'star';
        star.textContent = '✦';
        track.appendChild(s);
        track.appendChild(star);
      });
    }
  }

  /* ============ Scroll reveal ============ */
  function initReveal() {
    const targets = document.querySelectorAll(
      '.symptom-card, .pillar, .value-card, .flow-step, .offer, .brand-photo-wrap, .section-photo-wrap'
    );
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    targets.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 3) * 0.08 + 's';
      io.observe(el);
    });
  }

  /* ============ Quiz ============ */
  const quizState = new Array(QUIZ.en.length).fill(false);

  function renderQuiz() {
    const grid = document.getElementById('quizGrid');
    if (!grid) return;
    grid.innerHTML = '';
    QUIZ[lang].forEach(function (label, i) {
      const wrap = document.createElement('label');
      wrap.className = 'quiz-item' + (quizState[i] ? ' checked' : '');
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = quizState[i];
      cb.addEventListener('change', function () {
        quizState[i] = cb.checked;
        wrap.classList.toggle('checked', cb.checked);
      });
      const span = document.createElement('span');
      span.textContent = label;
      wrap.appendChild(cb);
      wrap.appendChild(span);
      grid.appendChild(wrap);
    });
  }

  /* ---- Diagnostic state + backend hooks ---- */
  let lastReport = null;
  let reportUnlocked = false;
  let otpCode = null;
  let leadData = null;

  // To go live, point these at your backend. Leave blank for on-page test mode.
  const OTP_SEND_ENDPOINT = '';    // POST {name,email,wa} -> sends WhatsApp code
  const OTP_VERIFY_ENDPOINT = '';  // POST {wa,code} -> { ok: true }
  const LEAD_ENDPOINT = '';        // POST lead + report (e.g. a Formspree URL)
  const TEST_MODE = !(OTP_SEND_ENDPOINT && OTP_VERIFY_ENDPOINT);

  function money(n) { return Math.round(n).toLocaleString('en-US') + ' SAR'; }
  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function isWa(v) { return /^\+?[0-9][0-9\-]{7,16}$/.test(v.replace(/\s/g, '')); }
  function maskWa(wa) { const d = wa.replace(/\s/g, ''); return d.length > 5 ? d.slice(0, 3) + '••••' + d.slice(-2) : d; }

  function computeReport() {
    const score = quizState.filter(Boolean).length;
    const pct = score / QUIZ.en.length;
    const rev = parseFloat(document.getElementById('ctxRev').value) || 250000;
    const team = parseFloat(document.getElementById('ctxTeam').value) || 8;
    const hoursWk = parseFloat(document.getElementById('ctxHours').value) || 12;

    const areas = AREAS.map(function (a) {
      const ticked = a.items.filter(function (i) { return quizState[i]; }).length;
      return { id: a.id, ticked: ticked, total: a.items.length, pct: ticked / a.items.length };
    });

    const lossRate = 0.03 + 0.09 * pct;                       // 3%–12% of revenue
    const moneyMonth = Math.round((rev * lossRate) / 500) * 500;
    const hoursMonth = Math.round(hoursWk * 4.3 * (0.45 + 0.55 * pct));
    const moneyYear = moneyMonth * 12;

    const ranked = areas.slice().filter(function (a) { return a.ticked > 0; })
      .sort(function (x, y) { return (y.pct - x.pct) || (y.ticked - x.ticked); });
    const planIds = (ranked.length ? ranked : areas).map(function (a) { return a.id; }).slice(0, 3);

    const band = score <= 2 ? 'calm' : score <= 6 ? 'friction' : 'chaos';
    const benchPct = Math.min(93, Math.max(8, Math.round(pct * 88) + 6));

    return { score: score, pct: pct, band: band, areas: areas, planIds: planIds,
      moneyMonth: moneyMonth, hoursMonth: hoursMonth, moneyYear: moneyYear,
      benchPct: benchPct, rev: rev, team: team, hoursWk: hoursWk };
  }

  function renderTeaser(rep) {
    const r = RESULTS[lang][rep.band];
    const box = document.getElementById('quizResult');
    box.className = 'quiz-result visible ' + r.cls;
    document.getElementById('quizScore').textContent = rep.score;
    document.getElementById('quizTitle').textContent = r.title;
    document.getElementById('quizText').textContent = r.text;

    const areasEl = document.getElementById('quizAreas');
    areasEl.innerHTML = '';
    rep.areas.forEach(function (a) {
      const t = AREA_TEXT[lang][a.id];
      const sev = a.pct === 0 ? '' : a.pct <= 0.5 ? ' mid' : ' high';
      const row = document.createElement('div');
      row.className = 'qa-row';
      row.innerHTML =
        '<div class="qa-name"><span>' + t.name + '</span><span class="qa-count">' + a.ticked + '/' + a.total + '</span></div>' +
        '<div class="qa-bar"><div class="qa-fill' + sev + '" style="width:' + Math.max(a.pct * 100, 4) + '%"></div></div>';
      areasEl.appendChild(row);
    });
  }

  function renderDeep(rep) {
    const dict = I18N[lang];
    document.getElementById('costMoney').textContent = money(rep.moneyMonth);
    document.getElementById('costHours').textContent = rep.hoursMonth + ' ' + dict.deep_hours_unit;
    document.getElementById('costYear').textContent = money(rep.moneyYear);

    const areasEl = document.getElementById('deepAreas');
    areasEl.innerHTML = '';
    rep.areas.forEach(function (a) {
      const t = AREA_TEXT[lang][a.id];
      const sev = a.pct === 0 ? 'ok' : a.pct <= 0.5 ? 'mid' : 'high';
      const fill = sev === 'high' ? 'high' : sev === 'mid' ? 'mid' : '';
      const card = document.createElement('div');
      card.className = 'deep-area sev-' + sev;
      card.innerHTML =
        '<div class="da-head"><span class="da-name">' + t.name + '</span><span class="da-count">' + a.ticked + '/' + a.total + '</span></div>' +
        '<div class="qa-bar"><div class="qa-fill ' + fill + '" style="width:' + Math.max(a.pct * 100, 4) + '%"></div></div>' +
        '<p class="da-insight">' + t.insight + '</p>' +
        '<p class="da-move"><strong>' + dict.quiz_move_label + '</strong> ' + t.move + '</p>';
      areasEl.appendChild(card);
    });

    const planEl = document.getElementById('deepPlan');
    planEl.innerHTML = '';
    rep.planIds.forEach(function (id, i) {
      const t = AREA_TEXT[lang][id];
      const li = document.createElement('li');
      li.innerHTML = '<span class="dp-num">' + (i + 1) + '</span><span class="dp-body"><strong>' + t.name + '</strong><br>' + t.move + '</span>';
      planEl.appendChild(li);
    });

    document.getElementById('deepBench').textContent = dict.deep_bench_tmpl.replace('{pct}', rep.benchPct);
  }

  function showResult() {
    lastReport = computeReport();
    reportUnlocked = false;
    renderTeaser(lastReport);
    document.getElementById('quizGate').style.display = 'block';
    document.getElementById('gateLock').style.display = 'block';
    document.getElementById('gateOtp').style.display = 'none';
    document.getElementById('quizDeep').style.display = 'none';
    document.getElementById('gateError').style.display = 'none';
    document.getElementById('otpError').style.display = 'none';
    document.getElementById('quizResult').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function gateSubmit(e) {
    e.preventDefault();
    const dict = I18N[lang];
    const name = document.getElementById('leadName').value.trim();
    const email = document.getElementById('leadEmail').value.trim();
    const wa = document.getElementById('leadWa').value.trim();
    const err = document.getElementById('gateError');
    function fail(msg) { err.textContent = msg; err.style.display = 'block'; }
    if (!name) return fail(dict.err_name);
    if (!isEmail(email)) return fail(dict.err_email);
    if (!isWa(wa)) return fail(dict.err_wa);
    err.style.display = 'none';
    leadData = { name: name, email: email, wa: wa };
    sendLead();
    startOtp(wa);
  }

  function startOtp(wa) {
    const dict = I18N[lang];
    document.getElementById('gateLock').style.display = 'none';
    document.getElementById('gateOtp').style.display = 'block';
    document.getElementById('otpSub').textContent = dict.otp_sent_mask.replace('{wa}', maskWa(wa));
    document.getElementById('otpInput').value = '';
    document.getElementById('otpError').style.display = 'none';
    const testEl = document.getElementById('otpTest');
    if (TEST_MODE) {
      otpCode = String(Math.floor(100000 + Math.random() * 900000));
      testEl.textContent = dict.otp_test_note.replace('{code}', otpCode);
      testEl.style.display = 'block';
    } else {
      otpCode = null; testEl.style.display = 'none';
      fetch(OTP_SEND_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: leadData.name, email: leadData.email, wa: wa }) }).catch(function () {});
    }
    document.getElementById('otpInput').focus();
    document.getElementById('gateOtp').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function verifyOtp() {
    const dict = I18N[lang];
    const code = document.getElementById('otpInput').value.trim();
    const err = document.getElementById('otpError');
    function bad() { err.textContent = dict.err_otp; err.style.display = 'block'; }
    if (TEST_MODE) {
      if (code !== otpCode) return bad();
      unlockReport();
    } else {
      fetch(OTP_VERIFY_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wa: leadData.wa, code: code }) })
        .then(function (r) { return r.json(); })
        .then(function (d) { if (d && d.ok) unlockReport(); else bad(); })
        .catch(bad);
    }
  }

  function unlockReport() {
    reportUnlocked = true;
    document.getElementById('quizGate').style.display = 'none';
    document.getElementById('quizDeep').style.display = 'block';
    renderDeep(lastReport);
    document.getElementById('quizDeep').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function sendLead() {
    if (!LEAD_ENDPOINT || !leadData || !lastReport) return;
    try {
      fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: leadData.name, email: leadData.email, whatsapp: leadData.wa,
          score: lastReport.score, band: lastReport.band, est_money_month: lastReport.moneyMonth,
          est_hours_month: lastReport.hoursMonth, lang: lang, ts: new Date().toISOString() }) }).catch(function () {});
    } catch (e) { /* ignore */ }
  }

  function downloadReport() {
    if (!lastReport) return;
    const dict = I18N[lang]; const rep = lastReport; const dir = lang === 'ar' ? 'rtl' : 'ltr';
    const rows = rep.areas.map(function (a) { const t = AREA_TEXT[lang][a.id];
      return '<tr><td>' + t.name + '</td><td>' + a.ticked + '/' + a.total + '</td><td>' + t.move + '</td></tr>'; }).join('');
    const plan = rep.planIds.map(function (id) { const t = AREA_TEXT[lang][id];
      return '<li><strong>' + t.name + '</strong> — ' + t.move + '</li>'; }).join('');
    const who = leadData ? ('<strong>' + leadData.name + '</strong> · ' + leadData.email + ' · ' + leadData.wa) : '';
    const html = '<!doctype html><html lang="' + lang + '" dir="' + dir + '"><meta charset="utf-8"><title>' + dict.report_title + '</title>' +
      '<body style="font-family:system-ui,Arial,sans-serif;max-width:720px;margin:40px auto;color:#0A2A1C;padding:0 20px">' +
      '<h1 style="color:#107044">' + dict.report_title + '</h1><p>' + who + '</p>' +
      '<h2>' + dict.deep_cost_eyebrow + '</h2><p>' + money(rep.moneyMonth) + ' ' + dict.deep_cost_money + ' · ' +
      rep.hoursMonth + ' ' + dict.deep_hours_unit + ' ' + dict.deep_cost_hours + ' · ' + money(rep.moneyYear) + ' ' + dict.deep_cost_year + '</p>' +
      '<p style="color:#555">' + dict.deep_cost_note + '</p>' +
      '<h2>' + dict.deep_areas_eyebrow + '</h2><table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%"><tbody>' + rows + '</tbody></table>' +
      '<h2>' + dict.deep_plan_eyebrow + '</h2><ol>' + plan + '</ol>' +
      '<p>' + dict.deep_bench_tmpl.replace('{pct}', rep.benchPct) + '</p>' +
      '<hr><p>Green Oaisys · greenoaisys.com · hello@greenoaisys.com</p></body></html>';
    const blob = new Blob([html], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'green-oaisys-leak-report.html'; a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
  }

  /* ============ Calendly popup ============ */
  const CALENDLY_URL = 'https://calendly.com/greenoaisys/30min';
  function initCalendly() {
    document.querySelectorAll('a.calendly-open').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (window.Calendly) {
          e.preventDefault();
          window.Calendly.initPopupWidget({ url: CALENDLY_URL });
        }
        // If the widget script hasn't loaded, the link opens the Calendly page directly.
      });
    });
  }

  /* ============ WhatsApp click-to-chat ============ */
  function waLink() {
    const msg = encodeURIComponent(WHATSAPP_MSG[lang] || WHATSAPP_MSG.en);
    return 'https://wa.me/' + WHATSAPP_NUMBER.replace(/[^0-9]/g, '') + '?text=' + msg;
  }
  function initWhatsApp() {
    const href = waLink();
    document.querySelectorAll('[data-wa]').forEach(function (a) { a.setAttribute('href', href); a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener'); });
  }

  /* ============ Google Forms lead capture ============ */
  function submitGForm(cfg, data, statusEl, dict) {
    if (!cfg.action) { if (statusEl) { statusEl.textContent = dict.form_success; statusEl.className = 'form-status ok'; } return; }
    const body = new URLSearchParams();
    Object.keys(cfg.fields).forEach(function (k) { if (data[k] != null) body.append(cfg.fields[k], data[k]); });
    fetch(cfg.action, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() })
      .then(function () { if (statusEl) { statusEl.textContent = dict.form_success; statusEl.className = 'form-status ok'; } })
      .catch(function () { if (statusEl) { statusEl.textContent = dict.form_success; statusEl.className = 'form-status ok'; } });
  }
  function initForms() {
    document.querySelectorAll('form[data-gform]').forEach(function (form) {
      form.dataset.rendered = Date.now();   // for the fast-submit spam check
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const dict = I18N[lang];
        const kind = form.getAttribute('data-gform');
        const cfg = GFORM[kind]; if (!cfg) return;
        const statusEl = form.querySelector('.form-status');
        const get = function (n) { const el = form.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ''; };
        // Spam guards: honeypot field filled, or submitted suspiciously fast (bots)
        const hp = form.querySelector('[name="company_hp"]');
        const tooFast = (Date.now() - Number(form.dataset.rendered || 0)) < 2500;
        if ((hp && hp.value) || tooFast) {
          if (statusEl) { statusEl.textContent = dict.form_success; statusEl.className = 'form-status ok'; }
          form.reset();
          return;
        }
        const data = { name: get('name'), business: get('business'), email: get('email'), wa: get('wa'), message: get('message') };
        if (!data.name) { if (statusEl) { statusEl.textContent = dict.err_name; statusEl.className = 'form-status err'; } return; }
        if (!isEmail(data.email)) { if (statusEl) { statusEl.textContent = dict.err_email; statusEl.className = 'form-status err'; } return; }
        if (!isWa(data.wa)) { if (statusEl) { statusEl.textContent = dict.err_wa; statusEl.className = 'form-status err'; } return; }
        submitGForm(cfg, data, statusEl, dict);
        form.reset();
      });
    });
  }

  /* ============ Init ============ */
  document.getElementById('langToggle').addEventListener('click', function () {
    lang = lang === 'en' ? 'ar' : 'en';
    applyLang();
  });
  function on(id, ev, fn) { const el = document.getElementById(id); if (el) el.addEventListener(ev, fn); }
  on('quizSubmit', 'click', showResult);
  on('gateForm', 'submit', gateSubmit);
  on('otpVerify', 'click', verifyOtp);
  on('otpResend', 'click', function () { if (leadData) startOtp(leadData.wa); });
  on('otpInput', 'keydown', function (e) { if (e.key === 'Enter') verifyOtp(); });
  on('deepDownload', 'click', downloadReport);

  applyLang();
  initReveal();
  initCalendly();
  initWhatsApp();
  initForms();
})();
