'use client'

import BurnoutPanel from './panels/BurnoutPanel'
import StaffAssistPanel from './panels/StaffAssistPanel'
import SchedulerPanel from './panels/SchedulerPanel'
import EVVPanel from './panels/EVVPanel'
import AutoApprovalPanel from './panels/AutoApprovalPanel'
import AutoSwapPanel from './panels/AutoSwapPanel'
import CredentialingPanel from './panels/CredentialingPanel'

interface AgentPanelRendererProps {
  panelType: string
}

export default function AgentPanelRenderer({ panelType }: AgentPanelRendererProps) {
  switch (panelType) {
    case 'burnout':      return <BurnoutPanel />
    case 'staffassist':  return <StaffAssistPanel />
    case 'scheduler':    return <SchedulerPanel />
    case 'evv':          return <EVVPanel />
    case 'autoapproval': return <AutoApprovalPanel />
    case 'autoswap':     return <AutoSwapPanel />
    case 'credentialing': return <CredentialingPanel />
    default:             return null
  }
}
