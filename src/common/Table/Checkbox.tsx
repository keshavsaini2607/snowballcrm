import React from "react";

const Checkbox = React.forwardRef(({ intermediate, ...rest }, ref) => {
   const defaultRef = React.useRef();
   const resolvedRef = ref || defaultRef;

   React.useEffect(() => {
      resolvedRef.current.intermediate = intermediate;
   }, [resolvedRef, intermediate]);

   return (
      <>
         <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
   );
});

export default Checkbox;
