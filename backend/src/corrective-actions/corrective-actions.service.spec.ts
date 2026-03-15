import { BadRequestException } from '@nestjs/common';
import { CorrectiveActionsService } from './corrective-actions.service';

describe('CorrectiveActionsService lifecycle', () => {
  const save = jest.fn(async (v) => v);
  const findOne = jest.fn();

  const repository = {
    save,
    findOne,
    create: jest.fn((v) => v),
    find: jest.fn(),
    remove: jest.fn(),
  } as any;

  const notificationsService = {
    create: jest.fn(),
  } as any;

  const service = new CorrectiveActionsService(repository, notificationsService);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should block close without effectiveness verification', async () => {
    findOne.mockResolvedValue({ id: 'c1', status: 'effectiveness_review', metadata: {} });

    await expect(service.transition('c1', { action: 'close' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('should allow close after effectiveness verification', async () => {
    findOne.mockResolvedValue({
      id: 'c2',
      status: 'effectiveness_review',
      metadata: { effectivenessVerified: true },
    });

    const result = await service.transition('c2', { action: 'close' }, 'u1');
    expect(result.status).toBe('closed');
    expect(save).toHaveBeenCalled();
  });

  it('should create overdue CAPA notifications', async () => {
    repository.find.mockResolvedValue([
      {
        id: 'c3',
        tenantId: 't1',
        name: 'CAPA-3',
        status: 'implementation',
        metadata: { dueDate: '2000-01-01T00:00:00.000Z', ownerUserId: 'owner-1' },
      },
    ]);

    const result = await service.generateOverdueAlerts(new Date('2026-01-01T00:00:00.000Z'));

    expect(result).toEqual({ createdAlerts: 1 });
    expect(notificationsService.create).toHaveBeenCalledWith(
      expect.objectContaining({ eventType: 'capa.overdue' }),
    );
  });
});
