import { BUTTONS, EVENTS } from "./consts";

export function navigate(href) {
  window.history.pushState({}, "", href);

  // crear un evento personlaizado
  const navigationEvent = new Event(EVENTS.PUSHSTATE);
  //Lanzar el evento
  window.dispatchEvent(navigationEvent);
}

export function Link({ target, to, ...props }) {
  const handleClick = (event) => {
    const isMainEvent = event.button === BUTTONS.primary;
    const isModifiedEvent =
      event.metaKey || event.altKey || event.crtlKey || event.shiftKey;
    const isManageableEvent = target === undefined || target === "self";

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault();
      navigate(to);
    }
  };

  return <a onClick={handleClick} href={to} target={target} {...props}></a>;
}
