import BurnoutVisual      from './agent-visuals/BurnoutVisual'
import StaffAssistVisual  from './agent-visuals/StaffAssistVisual'
import SchedulerVisual    from './agent-visuals/SchedulerVisual'
import EVVVisual          from './agent-visuals/EVVVisual'
import AutoApprovalVisual from './agent-visuals/AutoApprovalVisual'
import AutoSwapVisual     from './agent-visuals/AutoSwapVisual'
import CredentialingVisual from './agent-visuals/CredentialingVisual'

export default function AgentVisualRenderer({ visual }: { visual: string }) {
  switch (visual) {
    case 'burnout':       return <BurnoutVisual />
    case 'staffassist':   return <StaffAssistVisual />
    case 'scheduler':     return <SchedulerVisual />
    case 'evv':           return <EVVVisual />
    case 'autoapproval':  return <AutoApprovalVisual />
    case 'autoswap':      return <AutoSwapVisual />
    case 'credentialing': return <CredentialingVisual />
    default:              return null
  }
}
