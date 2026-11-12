/** Touch gesture gating for the LOS! 1 C01 facsimile pilot.
 * Returning null keeps the OS back gesture, browser scroll and page pan intact.
 */
export type FacsimileSwipeInput = {
  startX: number;
  deltaX: number;
  deltaY: number;
  zoom: number;
  continuous: boolean;
  beganOnControl: boolean;
  fingers: number;
};
export function getFacsimileSwipeDirection(input: FacsimileSwipeInput): -1 | 1 | null {
  if (input.continuous || input.beganOnControl || input.fingers !== 1 ||
      input.zoom !== 100 || input.startX < 24) return null;
  if (Math.abs(input.deltaX) < 65 || Math.abs(input.deltaX) < Math.abs(input.deltaY) * 1.5) return null;
  return input.deltaX < 0 ? 1 : -1;
}
