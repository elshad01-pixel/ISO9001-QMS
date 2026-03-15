import { Reflector } from '@nestjs/core';
import { PermissionsGuard } from './permissions.guard';

describe('PermissionsGuard (RBAC)', () => {
  it('allows when user has all required permissions', () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(['documents:view', 'documents:edit']),
    } as unknown as Reflector;

    const guard = new PermissionsGuard(reflector);
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => ({ user: { permissions: ['documents:view', 'documents:edit'] } }),
      }),
    } as any;

    expect(guard.canActivate(context)).toBe(true);
  });

  it('denies when a required permission is missing', () => {
    const reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(['documents:approve']),
    } as unknown as Reflector;

    const guard = new PermissionsGuard(reflector);
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({ getRequest: () => ({ user: { permissions: ['documents:view'] } }) }),
    } as any;

    expect(guard.canActivate(context)).toBe(false);
  });
});
