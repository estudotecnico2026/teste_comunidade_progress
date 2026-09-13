/**
 * STATUS BADGE COMPONENT
 * Badge para exibir status com acessibilidade AAA
 */

import React from 'react';
import { STUDY_STATUS_ICONS, GOAL_STATUS_ICONS, STATUS_ICONS } from '@/lib/constants/progress-icons';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export type BadgeVariant = 
  | 'em-andamento'
  | 'concluido'
  | 'pausado'
  | 'nao-iniciado'
  | 'bloqueado'
  | 'sucesso'
  | 'erro'
  | 'aviso'
  | 'info';

export type BadgeSize = 'sm' | 'md' | 'lg';

interface StatusBadgeProps {
  /** Variante do badge */
  variant: BadgeVariant;
  
  /** Tamanho do badge */
  size?: BadgeSize;
  
  /** Texto customizado (sobrescreve o padrão) */
  label?: string;
  
  /** Mostrar ícone */
  showIcon?: boolean;
  
  /** Classes CSS adicionais */
  className?: string;
}

/**
 * Configurações de estilo por variante
 */
const VARIANT_STYLES = {
  'nao-iniciado': {
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-700 dark:text-gray-300',
    border: 'border-gray-300 dark:border-gray-600',
    icon: STUDY_STATUS_ICONS['nao-iniciado'],
    label: 'Não iniciado'
  },
  'em-andamento': {
    bg: 'bg-blue-100 dark:bg-blue-900/50',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-300 dark:border-blue-600',
    icon: STUDY_STATUS_ICONS['em-andamento'],
    label: 'Em andamento'
  },
  'pausado': {
    bg: 'bg-amber-100 dark:bg-amber-900/50',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-300 dark:border-amber-600',
    icon: STUDY_STATUS_ICONS.pausado,
    label: 'Pausado'
  },
  'concluido': {
    bg: 'bg-green-100 dark:bg-green-900/50',
    text: 'text-green-700 dark:text-green-300',
    border: 'border-green-300 dark:border-green-600',
    icon: STUDY_STATUS_ICONS.concluido,
    label: 'Concluído'
  },
  'bloqueado': {
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-600 dark:text-gray-400',
    border: 'border-gray-300 dark:border-gray-600',
    icon: STUDY_STATUS_ICONS.bloqueado,
    label: 'Bloqueado'
  },
  'sucesso': {
    bg: 'bg-green-100 dark:bg-green-900/50',
    text: 'text-green-700 dark:text-green-300',
    border: 'border-green-300 dark:border-green-600',
    icon: STATUS_ICONS.sucesso,
    label: 'Sucesso'
  },
  'erro': {
    bg: 'bg-red-100 dark:bg-red-900/50',
    text: 'text-red-700 dark:text-red-300',
    border: 'border-red-300 dark:border-red-600',
    icon: STATUS_ICONS.erro,
    label: 'Erro'
  },
  'aviso': {
    bg: 'bg-amber-100 dark:bg-amber-900/50',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-300 dark:border-amber-600',
    icon: STATUS_ICONS.aviso,
    label: 'Aviso'
  },
  'info': {
    bg: 'bg-blue-100 dark:bg-blue-900/50',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-300 dark:border-blue-600',
    icon: STATUS_ICONS.info,
    label: 'Informação'
  }
} as const;

/**
 * Tamanhos
 */
const SIZE_STYLES = {
  sm: {
    padding: 'px-2 py-0.5',
    text: 'text-xs',
    iconSize: 12,
    gap: 'gap-1'
  },
  md: {
    padding: 'px-2.5 py-1',
    text: 'text-xs',
    iconSize: 14,
    gap: 'gap-1.5'
  },
  lg: {
    padding: 'px-3 py-1.5',
    text: 'text-sm',
    iconSize: 16,
    gap: 'gap-2'
  }
} as const;

export function StatusBadge({
  variant,
  size = 'md',
  label,
  showIcon = true,
  className
}: StatusBadgeProps) {
  const variantStyle = VARIANT_STYLES[variant];
  const sizeStyle = SIZE_STYLES[size];
  const Icon = variantStyle.icon;
  const displayLabel = label || variantStyle.label;
  
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md font-medium border",
        variantStyle.bg,
        variantStyle.text,
        variantStyle.border,
        sizeStyle.padding,
        sizeStyle.text,
        sizeStyle.gap,
        className
      )}
      role="status"
      aria-label={displayLabel}
    >
      {showIcon && Icon && (
        <Icon 
          size={sizeStyle.iconSize} 
          aria-hidden="true"
          className="flex-shrink-0"
        />
      )}
      <span>{displayLabel}</span>
    </span>
  );
}

/**
 * Exemplo de uso:
 * 
 * <StatusBadge variant="em-andamento" />
 * <StatusBadge variant="concluido" size="lg" />
 * <StatusBadge variant="erro" label="Falha ao carregar" showIcon={false} />
 */
