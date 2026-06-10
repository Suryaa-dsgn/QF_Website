"""
Generate Quickflows FAQ PDF — places output at public/quickflows-faq.pdf
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable,
    KeepTogether, Table, TableStyle,
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER

# ── Brand colours ────────────────────────────────────────────────────
BRAND_PURPLE   = colors.HexColor('#6B3FA0')
BRAND_DARK     = colors.HexColor('#0A0A0A')
BRAND_MUTED    = colors.HexColor('#4B5563')
BRAND_SUBTLE   = colors.HexColor('#9CA3AF')
BRAND_HAIRLINE = colors.HexColor('#E5E7EB')
BRAND_BG       = colors.HexColor('#F9F8FF')
WHITE          = colors.white

# ── Output path ──────────────────────────────────────────────────────
OUT_DIR  = os.path.join(os.path.dirname(__file__), '..', 'public')
OUT_FILE = os.path.join(OUT_DIR, 'quickflows-faq.pdf')

# ── FAQ data ─────────────────────────────────────────────────────────
FAQ_SECTIONS = [
    {
        'label': 'Implementation & Setup',
        'items': [
            {
                'q': 'How long does it actually take to go from signed contract to agents running live?',
                'a': 'Standard environments are live in under 100 hours. That\'s typically two to four weeks depending on how quickly your team completes the workflow mapping session and provides API credentials for your existing systems. Complex multi-system integrations may take an additional week. We give you a written go-live date before work begins.',
            },
            {
                'q': 'Do we need to replace our existing systems — scheduling software, EHR, billing platform?',
                'a': 'No. Quickflows connects to your existing systems via API. Nothing gets replaced. Agents read from and write to your current tools. If your system has an API or data export capability, we can work with it.',
            },
            {
                'q': 'Do we need an internal IT team or consultants to get started?',
                'a': 'No. Onboarding is handled entirely by Quickflows. We manage integration setup, configuration, and testing. You\'ll need someone who can approve API access to your existing systems — typically a 20-30 minute task. No developer resources or consultants required.',
            },
            {
                'q': 'What does the onboarding process look like, step by step?',
                'a': 'Four stages. First, a 90-minute workflow mapping session where we document your processes, exception rules, and escalation paths. Second, integration setup — we connect to your systems and validate data flows (2-3 days). Third, a supervised test run where agents operate on live data with a human reviewing every decision. Fourth, a controlled go-live with autonomous agents and your team monitoring the audit dashboard. Total: under 100 hours from contract to live.',
            },
        ],
    },
    {
        'label': 'Control & Accountability',
        'items': [
            {
                'q': 'What decisions can agents make autonomously, and what gets escalated to a human?',
                'a': 'You define this during configuration. By default, agents handle routine, rule-based decisions — filling an open shift from an approved candidate pool, matching an invoice to a PO within tolerance, flagging a credential renewal. Anything outside configured thresholds gets escalated immediately with full context. You set the thresholds and can adjust them at any time.',
            },
            {
                'q': 'If an agent makes a wrong decision, what happens and who is accountable?',
                'a': 'Every agent action is logged with a full decision trace — what data it used, what rule it applied, and what it decided. If a decision is wrong, you can see exactly why and correct the underlying rule. We are accountable for the platform performing as configured. You are accountable for the rules you set. We work through any operational errors together under our SLA.',
            },
            {
                'q': 'Can we configure the rules the agents operate within?',
                'a': 'Yes, fully. During onboarding we translate your existing policies — collective bargaining rules, payer contract terms, credentialing requirements — into agent configuration. After go-live, you can adjust thresholds, add exceptions, and update rules through your operations dashboard without involving Quickflows. Changes take effect immediately.',
            },
            {
                'q': 'Can we pause or turn off individual agents without disrupting others?',
                'a': 'Yes. Each agent runs independently. Pausing the Call-Off Management agent has no effect on the Claims Compliance agent or any other. When an agent is paused, those tasks revert to your existing manual process. You can pause, resume, or retire individual agents from the dashboard at any time.',
            },
            {
                'q': 'Is there a full audit trail of every decision an agent makes?',
                'a': 'Yes. Every action — every shift assignment, every invoice match, every credential flag — is logged with timestamp, data inputs, rule applied, and outcome. Audit logs are exportable and retained for a minimum of seven years to support compliance reviews, payer audits, and regulatory inquiries.',
            },
        ],
    },
    {
        'label': 'Security & Compliance',
        'items': [
            {
                'q': 'Where is our operational data stored, and who can access it?',
                'a': 'Data is stored in SOC 2 Type II compliant infrastructure within the United States. Access is restricted to your organisation\'s users and Quickflows engineers who require it for support purposes. All access is logged. We do not share your operational data with any third party.',
            },
            {
                'q': 'How is data handled at the end of a contract?',
                'a': 'On contract termination, your data is exported and delivered to you in full within 30 days. Following your confirmation of receipt, all data is deleted from Quickflows systems within 60 days. You receive a written deletion confirmation.',
            },
            {
                'q': 'Does Quickflows use our operational data to train models?',
                'a': 'No. Your operational data is used exclusively to run your agents. It is never used to train, fine-tune, or benchmark Quickflows models or any third-party model. This is contractually guaranteed.',
            },
        ],
    },
    {
        'label': 'Pricing & Commercial',
        'items': [
            {
                'q': 'How is Quickflows priced — per agent, per seat, or by operational volume?',
                'a': 'Pricing is per agent suite, not per seat or per transaction. You pay a flat monthly fee for each suite you activate (Workforce, Financial, Compliance). There are no per-transaction or per-decision charges. Volume is unlimited within your contracted suite.',
            },
            {
                'q': 'Is there a minimum contract commitment?',
                'a': 'The standard commitment is 12 months. We offer this because operational improvements — particularly in scheduling and claims recovery — compound over time, and short-term pilots consistently underestimate value. Quarterly contracts are available in specific circumstances; ask your account contact.',
            },
            {
                'q': 'What does implementation and onboarding cost?',
                'a': 'Onboarding is included in the contract for standard environments. There is no separate implementation fee for organisations with one or two systems to integrate. Complex multi-system environments with custom compliance rules may carry a scoped onboarding fee — this is identified and agreed before contract signing.',
            },
            {
                'q': 'Can we start with one vertical and expand later?',
                'a': 'Yes. Most customers start with Workforce Operations — it typically shows the fastest measurable return — and expand to Financial or Compliance agents in subsequent contract years. Suites are independently licensed and can be added at any renewal point.',
            },
        ],
    },
    {
        'label': 'Technical Fit',
        'items': [
            {
                'q': 'What happens if our data quality or historical records are incomplete?',
                'a': 'Agents adapt to the data you have. We assess data quality during onboarding and flag any gaps that would affect specific capabilities. Most organisations have sufficient data to run core agents from day one. Where historical data is incomplete — for example, for credential renewal forecasting — agents begin with conservative defaults and improve as data accumulates.',
            },
            {
                'q': 'Can the agents learn our specific policies and compliance rules, or do they use generic templates?',
                'a': 'Every agent is configured to your specific rules — your collective bargaining agreement, your payer contracts, your credentialing requirements, your approval thresholds. There are no generic templates. Configuration is done during onboarding and owned by your organisation. Rule changes are always explicit and human-approved.',
            },
            {
                'q': 'What happens if our primary systems go down?',
                'a': 'Agents detect upstream system unavailability and pause affected workflows automatically. Your team receives an immediate notification. No decisions are made on incomplete data. When systems come back online, queued tasks are processed in order. Critical escalations that cannot wait are routed to your team during any outage window.',
            },
        ],
    },
    {
        'label': 'Before You Commit',
        'items': [
            {
                'q': 'Can we see agents running in scenarios specific to our operations before signing?',
                'a': 'Yes. We run a scoped demonstration using anonymised versions of your actual workflow scenarios — not generic demos. If you can share three to five examples of current operational incidents (call-offs, denied claims, credential renewals), we build the demonstration around those. Request a demo through the contact form.',
            },
            {
                'q': 'Do you work with organisations at our size and scale?',
                'a': 'Quickflows is designed for mid-market to enterprise operations — typically organisations managing 150+ staff, processing 500+ invoices per month, or maintaining credentialing for 100+ providers. We work with health systems, staffing agencies, REITs, and logistics operators. If your scale falls significantly outside that range, we\'ll tell you honestly whether we\'re the right fit.',
            },
            {
                'q': 'What does a typical first 30 days look like for a new customer?',
                'a': 'Days 1-7: workflow mapping and integration setup. Days 8-14: supervised test run — agents active, humans reviewing every decision. Days 15-21: phased go-live, starting with the highest-volume workflows. Days 22-30: full autonomous operation with daily check-ins from your Quickflows contact. By day 30, most customers have a clear view of operational impact and are seeing measurable reductions in coordinator workload.',
            },
            {
                'q': 'Will this replace our coordinators, AR team, or admin staff?',
                'a': 'No — and we think this question deserves a direct answer. Agents handle the coordination work: the calls, the cross-referencing, the monitoring, the routine approvals. Your coordinators, AR staff, and admin team shift from doing that work to overseeing it. The volume they can handle increases significantly. In practice, organisations use this capacity to stop relying on overtime, reduce agency spend, and let experienced staff focus on cases that actually need human judgment. We have not seen a deployment where staff were made redundant as a direct result of Quickflows.',
            },
        ],
    },
]

# ── Styles ───────────────────────────────────────────────────────────
def make_styles():
    return {
        'cover_title': ParagraphStyle(
            'cover_title',
            fontName='Helvetica-Bold',
            fontSize=28,
            textColor=WHITE,
            leading=34,
            alignment=TA_LEFT,
        ),
        'cover_sub': ParagraphStyle(
            'cover_sub',
            fontName='Helvetica',
            fontSize=12,
            textColor=colors.HexColor('#D8B4FE'),
            leading=18,
            alignment=TA_LEFT,
        ),
        'cover_url': ParagraphStyle(
            'cover_url',
            fontName='Helvetica',
            fontSize=10,
            textColor=colors.HexColor('#C4B5FD'),
            leading=14,
            alignment=TA_LEFT,
        ),
        'section_label': ParagraphStyle(
            'section_label',
            fontName='Helvetica-Bold',
            fontSize=8,
            textColor=BRAND_PURPLE,
            leading=12,
            spaceBefore=6,
            spaceAfter=4,
            letterSpacing=1.2,
        ),
        'question_num': ParagraphStyle(
            'question_num',
            fontName='Helvetica-Bold',
            fontSize=9,
            textColor=colors.HexColor('#C4B5FD'),
            leading=14,
        ),
        'question': ParagraphStyle(
            'question',
            fontName='Helvetica-Bold',
            fontSize=12,
            textColor=BRAND_DARK,
            leading=17,
            spaceAfter=4,
        ),
        'answer': ParagraphStyle(
            'answer',
            fontName='Helvetica',
            fontSize=10,
            textColor=BRAND_MUTED,
            leading=16,
            spaceAfter=0,
        ),
        'footer_text': ParagraphStyle(
            'footer_text',
            fontName='Helvetica',
            fontSize=8,
            textColor=BRAND_SUBTLE,
            leading=12,
            alignment=TA_CENTER,
        ),
    }


def build_cover(story, styles):
    """Purple cover block built as a Table (coloured background)."""
    W = 170 * mm
    cover_content = [
        Paragraph('QUICKFLOWS AI', ParagraphStyle(
            'brand_label',
            fontName='Helvetica-Bold',
            fontSize=9,
            textColor=colors.HexColor('#D8B4FE'),
            leading=14,
            letterSpacing=2,
        )),
        Spacer(1, 6 * mm),
        Paragraph('Frequently Asked<br/>Questions', styles['cover_title']),
        Spacer(1, 4 * mm),
        Paragraph(
            'Honest answers on implementation, security,<br/>'
            'pricing, and operations from the Quickflows team.',
            styles['cover_sub'],
        ),
        Spacer(1, 10 * mm),
        HRFlowable(width=W, thickness=0.5, color=colors.HexColor('#7C3AED'), spaceAfter=6),
        Paragraph('quickflows.ai  ·  info@quickflows.ai', styles['cover_url']),
    ]

    tbl = Table(
        [[cover_content]],
        colWidths=[W],
    )
    tbl.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), BRAND_PURPLE),
        ('ROUNDEDCORNERS', [10]),
        ('TOPPADDING',    (0, 0), (-1, -1), 20),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 20),
        ('LEFTPADDING',   (0, 0), (-1, -1), 20),
        ('RIGHTPADDING',  (0, 0), (-1, -1), 20),
    ]))
    story.append(tbl)
    story.append(Spacer(1, 10 * mm))


def build_section(story, styles, section, section_index):
    label_text = section['label'].upper()
    items = section['items']

    # Section header row
    story.append(HRFlowable(
        width='100%', thickness=0.6,
        color=colors.HexColor('#DDD6FE'),
        spaceAfter=3,
    ))
    story.append(Paragraph(label_text, styles['section_label']))
    story.append(Spacer(1, 3 * mm))

    for i, item in enumerate(items):
        num_str = f'{str(i + 1).zfill(2)}'
        q_text  = item['q']
        a_text  = item['a']

        q_block = [
            Paragraph(num_str, styles['question_num']),
            Spacer(1, 1 * mm),
            Paragraph(q_text, styles['question']),
            Paragraph(a_text, styles['answer']),
        ]
        story.append(KeepTogether(q_block))
        story.append(Spacer(1, 5 * mm))

        # Light hairline between questions (not after last)
        if i < len(items) - 1:
            story.append(HRFlowable(
                width='100%', thickness=0.4,
                color=BRAND_HAIRLINE,
                spaceAfter=5,
            ))

    story.append(Spacer(1, 6 * mm))


def on_page(canvas, doc):
    """Footer on every page."""
    W, H = A4
    canvas.saveState()
    canvas.setFont('Helvetica', 7.5)
    canvas.setFillColor(BRAND_SUBTLE)
    canvas.drawCentredString(W / 2, 18 * mm, 'quickflows.ai  ·  Confidential')
    canvas.drawRightString(W - 20 * mm, 18 * mm, f'Page {doc.page}')
    canvas.restoreState()


def generate():
    os.makedirs(OUT_DIR, exist_ok=True)
    doc = SimpleDocTemplate(
        OUT_FILE,
        pagesize=A4,
        leftMargin=20 * mm,
        rightMargin=20 * mm,
        topMargin=20 * mm,
        bottomMargin=28 * mm,
        title='Quickflows FAQ',
        author='Quickflows AI',
        subject='Frequently Asked Questions',
    )

    styles = make_styles()
    story  = []

    build_cover(story, styles)

    for idx, section in enumerate(FAQ_SECTIONS):
        build_section(story, styles, section, idx)

    doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
    print(f'PDF written -> {os.path.abspath(OUT_FILE)}')


if __name__ == '__main__':
    generate()
