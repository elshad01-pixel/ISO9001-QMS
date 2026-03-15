import { BadRequestException } from '@nestjs/common';
import { AuditsService } from './audits.service';

describe('AuditsService finding tracking', () => {
  const save = jest.fn(async (v) => v);
  const findOne = jest.fn();

  const repository = {
    save,
    findOne,
    create: jest.fn((v) => v),
    find: jest.fn(),
    remove: jest.fn(),
  } as any;

  const service = new AuditsService(repository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add finding and move planned audit to in_progress', async () => {
    findOne.mockResolvedValue({ id: 'a1', status: 'planned', metadata: { findings: [] } });

    const audit = await service.addFinding('a1', {
      title: 'Missing record',
      detail: 'No maintenance record available',
      severity: 'major_nc',
    });

    expect(audit.status).toBe('in_progress');
    expect((audit.metadata as any).findings).toHaveLength(1);
  });

  it('should prevent closing audit when major findings are open', async () => {
    findOne.mockResolvedValue({
      id: 'a2',
      status: 'in_progress',
      metadata: { findings: [{ severity: 'major_nc', status: 'open' }] },
    });

    await expect(service.closeAudit('a2')).rejects.toBeInstanceOf(BadRequestException);
  });
});
