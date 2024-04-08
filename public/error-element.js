export function generateErrorElement(message) {
  return `
    <p class="text-red">Unable to get planets: ${message}</p>
    `;
}
