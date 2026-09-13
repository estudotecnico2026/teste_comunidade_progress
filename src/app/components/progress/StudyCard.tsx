/**
 * STUDY CARD COMPONENT
 * Card para exibir estudos (cursos, artigos, projetos, etc.)
 * Acessibilidade AAA garantida
 */

import React from 'react';
import { STUDY_TYPE_ICONS, STUDY_STATUS_ICONS, ACTION_ICONS, ICON_SIZES } from '@/lib/constants/progress-icons';
import { cn } from '@/lib/utils';

export type StudyType = 'curso' | 'artigo' | 'video' | 'livro' | 'podcast' | 'projeto' | 'workshop' | 'mentoria';
export type StudyStatus = 'nao-iniciado' | 'em-andamento' | 'pausado' | 'concluido';

interface StudyCardProps {
  /** Tipo de estudo */
  type: StudyType;
  
  /** Título do estudo */
  title: string;
  
  /** Área de conhecimento */
  area?: string;
  
  /** Status atual */
  status: StudyStatus;
  
  /** Progresso em porcentagem (0-100) */
  progress?: number;
  
  /** Horas concluídas */
  hoursCompleted?: number;
  
  /** Total de horas */
  totalHours?: number;
  
  /** Prazo (data) */
  deadline?: string;
  
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
 * Mapeamento de status para estilos
 */
const STATUS_STYLES = {
  'nao-iniciado': {
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-700 dark:text-gray-300',
    border: 'border-gray-300 dark:border-gray-600',
    label: 'Não iniciado'
  },
  'em-andamento': {
    bg: 'bg-blue-50 dark:bg-blue-950',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-300 dark:border-blue-600',
    label: 'Em andamento'
  },
  'pausado': {
    bg: 'bg-amber-50 dark:bg-amber-950',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-300 dark:border-amber-600',
    label: 'Pausado'
  },
  'concluido': {
    bg: 'bg-green-50 dark:bg-green-950',
    text: 'text-green-700 dark:text-green-300',
    border: 'border-green-300 dark:border-green-600',
    label: 'Concluído'
  }
} as const;

/**
 * Mapeamento de tipos para labels
 */
const TYPE_LABELS: Record<StudyType, string> = {
  curso: 'Curso',
  artigo: 'Artigo',
  video: 'Vídeo',
  livro: 'Livro',
  podcast: 'Podcast',
  projeto: 'Projeto',
  workshop: 'Workshop',
  mentoria: 'Mentoria'
};

export function StudyCard({
  type,
  title,
  area,
  status,
  progress = 0,
  hoursCompleted,
  totalHours,
  deadline,
  onClick,
  onEdit,
  onDelete,
  className
}: StudyCardProps) {
  const TypeIcon = STUDY_TYPE_ICONS[type];
  const StatusIcon = STUDY_STATUS_ICONS[status];
  const statusStyle = STATUS_STYLES[status];
  
  // Calcular dias restantes se houver prazo
  const daysLeft = deadline ? calculateDaysLeft(deadline) : null;
  
  // Determinar se o prazo está próximo ou vencido
  const isDeadlineNear = daysLeft !== null && daysLeft <= 3 && daysLeft > 0;
  const isDeadlinePassed = daysLeft !== null && daysLeft < 0;
  
  return (
    <div
      className={cn(
        "group relative bg-card border rounded-lg p-6",
        "transition-all duration-200 hover:shadow-md",
        onClick && "cursor-pointer",
        statusStyle.border,
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
      <div className="flex items-start justify-between mb-3">
        {/* Tipo Badge */}
        <div className="flex items-center gap-2">
          <div className={cn(
            "p-2 rounded-md",
            statusStyle.bg
          )}>
            <TypeIcon 
              size={ICON_SIZES.sm} 
              className={statusStyle.text}
              aria-hidden="true"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">
              {TYPE_LABELS[type]}
            </span>
            {area && (
              <span className="text-xs text-muted-foreground">
                {area}
              </span>
            )}
          </div>
        </div>
        
        {/* Actions Menu */}
        {(onEdit || onDelete) && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="p-2 hover:bg-muted rounded-md transition-colors"
                aria-label="Editar estudo"
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
                aria-label="Excluir estudo"
              >
                <ACTION_ICONS.excluir size={ICON_SIZES.sm} className="text-destructive" />
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Title */}
      <h4 className="text-lg font-semibold mb-3 text-foreground line-clamp-2">
        {title}
      </h4>
      
      {/* Progress Bar */}
      {progress > 0 && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-muted-foreground">Progresso</span>
            <span className="text-xs font-medium text-foreground">{progress}%</span>
          </div>
          <div 
            className="h-2 bg-muted rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progresso: ${progress}% concluído`}
          >
            <div
              className={cn(
                "h-full transition-all duration-300 rounded-full",
                status === 'concluido' ? 'bg-green-600' :
                status === 'em-andamento' ? 'bg-blue-600' :
                'bg-gray-400'
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      
      {/* Footer */}
      <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-border">
        {/* Status Badge */}
        <div className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium",
          statusStyle.bg,
          statusStyle.text
        )}>
          <StatusIcon size={14} aria-hidden="true" />
          <span>{statusStyle.label}</span>
        </div>
        
        {/* Metadata */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {/* Hours */}
          {hoursCompleted !== undefined && totalHours !== undefined && (
            <span className="flex items-center gap-1">
              <ACTION_ICONS.calendario size={14} aria-hidden="true" />
              <span aria-label={`${hoursCompleted} de ${totalHours} horas concluídas`}>
                {hoursCompleted}h / {totalHours}h
              </span>
            </span>
          )}
          
          {/* Deadline */}
          {deadline && (
            <span 
              className={cn(
                "flex items-center gap-1",
                isDeadlinePassed && "text-red-600 dark:text-red-400 font-medium",
                isDeadlineNear && "text-amber-600 dark:text-amber-400 font-medium"
              )}
            >
              <ACTION_ICONS.calendario size={14} aria-hidden="true" />
              <span>
                {isDeadlinePassed ? (
                  `Vencido há ${Math.abs(daysLeft!)} dias`
                ) : isDeadlineNear ? (
                  `${daysLeft} dias restantes`
                ) : (
                  formatDate(deadline)
                )}
              </span>
            </span>
          )}
        </div>
      </div>
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
    month: 'short'
  });
}

/**
 * Exemplo de uso:
 * 
 * <StudyCard
 *   type="curso"
 *   title="Fundamentos de React"
 *   area="Desenvolvimento Web"
 *   status="em-andamento"
 *   progress={65}
 *   hoursCompleted={12}
 *   totalHours={20}
 *   deadline="2025-02-15"
 *   onClick={() => console.log('Ver detalhes')}
 *   onEdit={() => console.log('Editar')}
 *   onDelete={() => console.log('Excluir')}
 * />
 */
