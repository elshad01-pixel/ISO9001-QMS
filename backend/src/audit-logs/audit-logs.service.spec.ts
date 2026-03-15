import { AuditLogsService } from './audit-logs.service';

describe('AuditLogsService', () => {
  const save = jest.fn(async (v) => ({ id: 'log-1', ...v }));
  const repository = {
    save,
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn(),
    create: jest.fn((v) => v),
    remove: jest.fn(),
  } as any;

  const service = new AuditLogsService(repository);

  it('creates audit log entry payload', async () => {
    const result = await service.create({
      tenantId: 't1',
      action: 'update',
      entityName: 'documents',
      entityId: 'd1',
    });

    expect(save).toHaveBeenCalled();
    expect(result).toMatchObject({ action: 'update', entityName: 'documents' });
  });
});
