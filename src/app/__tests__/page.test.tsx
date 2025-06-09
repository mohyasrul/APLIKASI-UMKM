import { cn } from '@/lib/utils';

describe('Utility Functions', () => {
  it('should merge class names correctly', () => {
    const result = cn('btn', 'btn-primary', 'text-white');
    expect(result).toContain('btn');
    expect(result).toContain('btn-primary');
    expect(result).toContain('text-white');
  });

  it('should handle conditional classes', () => {
    const result = cn('btn', { 'btn-primary': true, 'btn-secondary': false });
    expect(result).toContain('btn');
    expect(result).toContain('btn-primary');
    expect(result).not.toContain('btn-secondary');
  });
});
