import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ThemeService } from '@core/services';
import { TitleBarComponent } from './title-bar.component';

describe('TitleBarComponent', () => {
  let spectator: Spectator<TitleBarComponent>;
  const createComponent = createComponentFactory({
    component: TitleBarComponent,
    mocks: [ThemeService],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should have empty title text by default', () => {
    expect(spectator.query('.title-text')?.textContent).toContain('');
  });

  it('should set the title text according to the [appTitle] input', () => {
    spectator.setInput('appTitle', 'some-title');
    expect(spectator.query('.title-text')?.textContent).toContain('some-title');
  });
});
