/**
 * GOAL CARD COMPONENT
 * Card para exibir objetivos de carreira
 * Acessibilidade AAA garantida
 */

import React from 'react';
import { CAREER_LEVEL_ICONS, PRIORITY_ICONS, ACTION_ICONS, ICON_SIZES } from '@/lib/constants/progress-icons';
import { cn } from '@/lib/utils';

export type CareerLevel = 'estagiario' | 'junior' | 'pleno' | 'senior' | 'especialista';
export type Priority = 'alta' | 'media' | 'baixa';

interface GoalCardProps {
  /** Título do objetivo */
  title: string;
  
  /** Área de foco */
  area?: string;
  
  /** Nível desejado */
  level?: CareerLevel;
  
  /** Prazo */
  deadline?: string;
  
  /** Progresso em porcentagem (0-100) */
  progress?: number;
  
  /** Número de estudos vinculados */
  linkedStudies?: number;
  
  /** Prioridade */
  priority?: Priority;
  
  /** Callback ao clicar no card */
  onClick?: () => void;
  
  /** Callback ao clicar em editar */
  onEdit?: () => void;
  
  /** Callback ao clicar em excluir */
  onDelete?: () => void;
  
  /** Classes CSS adicionais */
  className?: string;
}

/**
 * Mapeamento de prioridades para estilos
 */
const PRIORITY_STYLES = {
  alta: {
    borderColor: 'border-l-purple-600 dark:border-l-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    text: 'text-purple-700 dark:text-purple-300',
    label: 'Alta prioridade',
    badgeBg: 'bg-purple-100 dark:bg-purple-900/50'
  },
  media: {
    borderColor: 'border-l-blue-600 dark:border-l-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    text: 'text-blue-700 dark:text-blue-300',
    label: 'Média prioridade',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/50'
  },
  baixa: {
    borderColor: 'border-l-gray-400 dark:border-l-gray-500',
    bg: 'bg-gray-50 dark:bg-gray-900/30',
    text: 'text-gray-700 dark:text-gray-300',
    label: 'Baixa prioridade',
    badgeBg: 'bg-gray-100 dark:bg-gray-800'
  }
} as const;

/**
 * Mapeamento de níveis para labels
 */
const LEVEL_LABELS: Record<CareerLevel, string> = {
  estagiario: 'Estagiário',
  junior: 'Júnior',
  pleno: 'Pleno',
  senior: 'Sênior',
  especialista: 'Especialista'
};

export function GoalCard({
  title,
  area,
  level,
  deadline,
  progress = 0,
  linkedStudies = 0,
  priority = 'media',
  onClick,
  onEdit,
  onDelete,
  className
}: GoalCardProps) {
  const priorityStyle = PRIORITY_STYLES[priority];
  const LevelIcon = level ? CAREER_LEVEL_ICONS[level] : null;
  const PriorityIcon = PRIORITY_ICONS[priority];
  
  // Calcular dias restantes
  const daysLeft = deadline ? calculateDaysLeft(deadline) : null;
  const isDeadlineNear = daysLeft !== null && daysLeft <= 7 && daysLeft > 0;
  const isDeadlinePassed = daysLeft !== null && daysLeft < 0;
  
  return (
    <div
      className={cn(
        "group relative bg-card border border-l-4 rounded-lg p-6",
        "transition-all duration-200 hover:shadow-lg",
        onClick && "cursor-pointer",
        priorityStyle.borderColor,
        priorityStyle.bg,
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {/* Área e Nível */}
          <div className="flex items-center gap-2 mb-2">
            {area && (
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {area}
              </span>
            )}
            {level && LevelIcon && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <LevelIcon size={14} aria-hidden="true" />
                <span>{LEVEL_LABELS[level]}</span>
              </div>
            )}
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold text-foreground line-clamp-2 mb-1">
            {title}
          </h3>
        </div>
        
        {/* Actions Menu */}
        {(onEdit || onDelete) && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 ml-2">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="p-2 hover:bg-background/80 rounded-md transition-colors"
                aria-label="Editar objetivo"
              >
                <ACTION_ICONS.editar size={ICON_SIZES.sm} className="text-muted-foreground" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="p-2 hover:bg-destructive/10 rounded-md transition-colors"
                aria-label="Excluir objetivo"
              >
                <ACTION_ICONS.excluir size={ICON_SIZES.sm} className="text-destructive" />
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Progress Section */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">Progresso geral</span>
          <span className="text-sm font-bold text-foreground">{progress}%</span>
        </div>
        <div 
          className="h-3 bg-muted rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progresso: ${progress}% concluído`}
        >
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-purple-400 dark:from-purple-500 dark:to-purple-300 transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Footer */}
      <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-border/50">
        {/* Priority Badge */}
        <div className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium",
          priorityStyle.badgeBg,
          priorityStyle.text
        )}>
          <PriorityIcon size={14} aria-hidden="true" />
          <span>{priorityStyle.label}</span>
        </div>
        
        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {/* Linked Studies */}
          {linkedStudies > 0 && (
            <span className="flex items-center gap-1.5">
              <ACTION_ICONS.link size={16} aria-hidden="true" />
              <span className="font-medium">{linkedStudies}</span>
              <span className="hidden sm:inline">
                {linkedStudies === 1 ? 'estudo' : 'estudos'}
              </span>
            </span>
          )}
          
          {/* Deadline */}
          {deadline && (
            <span 
              className={cn(
                "flex items-center gap-1.5 font-medium",
                isDeadlinePassed && "text-red-600 dark:text-red-400",
                isDeadlineNear && "text-amber-600 dark:text-amber-400"
              )}
            >
              <ACTION_ICONS.calendario size={16} aria-hidden="true" />
              <span>
                {isDeadlinePassed ? (
                  `Vencido há ${Math.abs(daysLeft!)}d`
                ) : isDeadlineNear ? (
                  `${daysLeft}d restantes`
                ) : (
                  formatDate(deadline)
                )}
              </span>
            </span>
          )}
        </div>
      </div>
      
      {/* Progress Indicator (visual extra) */}
      {progress === 100 && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-lg">
          <ACTION_ICONS.check size={16} aria-label="Objetivo alcançado" />
        </div>
      )}
    </div>
  );
}

/**
 * Helpers
 */

function calculateDaysLeft(deadline: string): number {
  const deadlineDate = new Date(deadline);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  deadlineDate.setHours(0, 0, 0, 0);
  
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

/**
 * Exemplo de uso:
 * 
 * <GoalCard
 *   title="Tornar-me Desenvolvedor Full Stack"
 *   area="Tecnologia"
 *   level="pleno"
 *   deadline="2025-12-31"
 *   progress={42}
 *   linkedStudies={8}
 *   priority="alta"
 *   onClick={() => console.log('Ver detalhes')}
 *   onEdit={() => console.log('Editar')}
 *   onDelete={() => console.log('Excluir')}
 * />
 */
