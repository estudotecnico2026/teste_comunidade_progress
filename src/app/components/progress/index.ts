/**
 * PROGRESS COMPONENTS
 * Exportação centralizada de todos os componentes do Progress App
 */

export { StudyCard } from './StudyCard';
export type { StudyCardProps, StudyType, StudyStatus } from './StudyCard';

export { GoalCard } from './GoalCard';
export type { GoalCardProps, CareerLevel, Priority } from './GoalCard';

export { StatusBadge } from './StatusBadge';
export type { StatusBadgeProps, BadgeVariant, BadgeSize } from './StatusBadge';

/**
 * Exemplo de uso:
 * 
 * import { StudyCard, GoalCard, StatusBadge } from '@/components/progress';
 * import type { StudyType, CareerLevel } from '@/components/progress';
 */
