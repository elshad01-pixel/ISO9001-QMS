import { BadRequestException } from '@nestjs/common';
import { DocumentsService } from './documents.service';

describe('DocumentsService workflow transitions', () => {
  const save = jest.fn(async (v) => v);
  const findOne = jest.fn();
  const create = jest.fn((v) => v);
  const remove = jest.fn();

  const repository = {
    save,
    findOne,
    create,
    find: jest.fn(),
    remove,
  } as any;

  const service = new DocumentsService(repository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should reject release when effectiveDate is missing', async () => {
    findOne.mockResolvedValue({ id: '1', status: 'approved', metadata: {} });

    await expect(service.transition('1', { action: 'release' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('should allow valid draft -> in_review transition', async () => {
    findOne.mockResolvedValue({ id: '1', status: 'draft', metadata: {} });

    const result = await service.transition('1', { action: 'submit_review' }, 'user-1');

    expect(result.status).toBe('in_review');
    expect(save).toHaveBeenCalled();
    expect(result.metadata).toMatchObject({
      lastTransitionAt: expect.any(String),
    });
  });
});
