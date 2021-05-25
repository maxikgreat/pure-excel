/**
 * function handles resizing of 'column' and 'row' elements.
 * Needed elements we got throw data-* attributes in HTML.
 * data-resize - resizer component to drag it
 * data-resizable - component that will be resized after resizer will be shifted
 *
 * Also to shift columns data-column attribute is used. With it we understand
 * what particular column we need to move.
 *
 * @param {HTMLElement} $root
 * @param {HTMLDivElement} target
 */
const resizeHandler = ($root: HTMLElement, target: HTMLDivElement | null): void => {
  if (!target) return;

  const parent = target.closest<HTMLDivElement>('[data-type="resizable"]');
  if (!parent) return;

  const resize = target.dataset?.resize as 'row' | 'column' | undefined;
  if (!resize) return;

  const colIndex = parent.dataset?.column as string;
  const {width, height, right, bottom} = parent.getBoundingClientRect();

  target.style.opacity = '1';
  target.style[resize === 'column' ? 'bottom' : 'right'] = '-5000px';

  let delta: number;

  document.onmousemove = ({pageX, pageY}) => {
    if (resize === 'column') {
      delta = pageX - right;
      target.style.right = `${-delta}px`;
    } else {
      delta = pageY - bottom;
      target.style.bottom = `${-delta}px`;
    }
  };

  document.onmouseup = () => {
    if (resize === 'column') {
      $root.querySelectorAll<HTMLDivElement>(`[data-column="${colIndex}"]`)
          .forEach((cell) =>
            cell.style.width = `${width + delta}px`,
          );
    } else {
      parent.style.height = `${height + delta}px`;
    }

    document.onmousemove = null;
    document.onmouseup = null;

    target.style.opacity = '0';
    target.style.bottom = '0';
    target.style.right = '0';
  };
};

export default resizeHandler;
