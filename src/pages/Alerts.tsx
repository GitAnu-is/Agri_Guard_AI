import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BellIcon, CheckCheckIcon, Trash2Icon } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Input';
import { Tabs } from '../components/ui/Tabs';
import { Badge, PriorityBadge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/Feedback';
import { Drawer } from '../components/ui/Overlay';
import { cn } from '../utils/cn';
import { alertTypeTone, toneClasses } from '../utils/semantics';
import { useApp } from '../contexts/AppContext';
import { useToast } from '../contexts/ToastContext';
import type { AppAlert } from '../types';

const alertTypes = ['Disease Alert', 'Harvest Alert', 'Weather Alert', 'Transportation Alert', 'Storage Alert', 'Market Readiness Alert'];
const priorities = ['Critical', 'High', 'Medium', 'Low'];

export function Alerts() {
  const { alerts, unreadCount, markAlertRead, markAllAlertsRead, deleteAlert } = useApp();
  const { toast } = useToast();
  const [tab, setTab] = useState('all');
  const [type, setType] = useState('all');
  const [priority, setPriority] = useState('all');
  const [selected, setSelected] = useState<AppAlert | null>(null);

  const filtered = useMemo(
    () =>
    alerts.filter((a) => {
      if (tab === 'unread' && a.read) return false;
      if (tab === 'read' && !a.read) return false;
      if (type !== 'all' && a.type !== type) return false;
      if (priority !== 'all' && a.priority !== priority) return false;
      return true;
    }),
    [alerts, tab, type, priority]
  );

  return (
    <div className="mx-auto max-w-[1100px]">
      <PageHeader
        title="Alerts &amp; Notifications"
        description="Every alert raised by the platform's five AI components, prioritised so the most time-critical action is always first."
        breadcrumbs={[{ label: 'Platform', to: '/dashboard' }, { label: 'Intelligence' }, { label: 'Alerts' }]}
        meta={
        <>
            <Badge tone={unreadCount > 0 ? 'risk' : 'leaf'}>{unreadCount} unread</Badge>
            <Badge tone="earth">{alerts.length} total</Badge>
          </>
        }
        actions={
        <Button
          variant="secondary"
          onClick={() => {
            markAllAlertsRead();
            toast({ title: 'All alerts marked as read', variant: 'info' });
          }}
          disabled={unreadCount === 0}>
          
            <CheckCheckIcon className="h-4 w-4" aria-hidden="true" />
            Mark all as read
          </Button>
        } />
      

      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <Tabs
          variant="pill"
          items={[
          { id: 'all', label: 'All', count: alerts.length },
          { id: 'unread', label: 'Unread', count: unreadCount },
          { id: 'read', label: 'Read', count: alerts.length - unreadCount }]
          }
          active={tab}
          onChange={setTab} />
        
        <div className="flex flex-wrap gap-3">
          <div className="w-52">
            <Select label="Alert type" value={type} onChange={(e) => setType(e.target.value)} options={[{ value: 'all', label: 'All types' }, ...alertTypes.map((t) => ({ value: t, label: t }))]} />
          </div>
          <div className="w-40">
            <Select label="Priority" value={priority} onChange={(e) => setPriority(e.target.value)} options={[{ value: 'all', label: 'All priorities' }, ...priorities.map((p) => ({ value: p, label: p }))]} />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader title="Notification centre" description={`${filtered.length} alerts match the current filters.`} />
        {filtered.length === 0 ?
        <EmptyState
          title="No alerts match these filters"
          description="Widen the type or priority filter to see more of the alert stream."
          icon={<BellIcon className="h-5 w-5" aria-hidden="true" />} /> :


        <ul className="divide-y divide-earth-100">
            {filtered.map((alert) => {
            const tone = alertTypeTone(alert.type);
            return (
              <li key={alert.id} className={cn('flex gap-3 px-5 py-4', !alert.read && 'bg-leaf-50/40')}>
                  <span className={cn('mt-1 h-2.5 w-2.5 shrink-0 rounded-full', toneClasses[tone].bg)} aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={cn('text-[11px] font-bold uppercase tracking-wide', toneClasses[tone].text)}>{alert.type}</span>
                      <PriorityBadge priority={alert.priority} size="sm" />
                      {!alert.read &&
                    <Badge tone="sky" size="sm">
                          Unread
                        </Badge>
                    }
                      <span className="ml-auto font-mono text-[11px] text-earth-400">{alert.time}</span>
                    </div>
                    <h3 className="mt-1.5 text-[14px] font-semibold leading-5 text-leaf-900">{alert.title}</h3>
                    <p className="mt-1 text-[13px] leading-5 text-earth-600">{alert.message}</p>
                    <div className="mt-2.5 flex flex-wrap items-center gap-3">
                      <button
                      type="button"
                      onClick={() => {
                        setSelected(alert);
                        markAlertRead(alert.id);
                      }}
                      className="text-[13px] font-semibold text-leaf-700 hover:text-leaf-900">
                      
                        View details
                      </button>
                      <Link to={alert.link} className="text-[13px] font-semibold text-earth-600 hover:text-leaf-800">
                        Open module
                      </Link>
                      {!alert.read &&
                    <button type="button" onClick={() => markAlertRead(alert.id)} className="text-[13px] font-medium text-earth-500 hover:text-leaf-800">
                          Mark as read
                        </button>
                    }
                      <button
                      type="button"
                      onClick={() => {
                        deleteAlert(alert.id);
                        toast({ title: 'Alert deleted', variant: 'info' });
                      }}
                      className="inline-flex items-center gap-1 text-[13px] font-medium text-risk-600 hover:text-risk-800">
                      
                        <Trash2Icon className="h-3.5 w-3.5" aria-hidden="true" />
                        Delete
                      </button>
                    </div>
                  </div>
                </li>);

          })}
          </ul>
        }
      </Card>

      <Drawer
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected?.title ?? 'Alert'}
        description={selected ? `${selected.type} · ${selected.priority} priority · ${selected.time}` : undefined}>
        
        {selected &&
        <div className="space-y-4">
            <PriorityBadge priority={selected.priority} />
            <p className="text-[13px] leading-6 text-earth-700">{selected.message}</p>
            <CardBody className="rounded-lg border border-earth-200 bg-earth-50">
              <p className="text-[12px] font-semibold uppercase tracking-wide text-earth-500">Alert reference</p>
              <p className="mt-1 font-mono text-[13px] font-semibold text-leaf-900">{selected.id}</p>
            </CardBody>
            <Link
            to={selected.link}
            className="inline-flex h-10 items-center rounded-lg bg-leaf-700 px-4 text-[13px] font-semibold text-white transition-colors duration-150 ease-out hover:bg-leaf-800">
            
              Open the related module
            </Link>
          </div>
        }
      </Drawer>
    </div>);

}