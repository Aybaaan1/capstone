export default function Button({bgColor, txtColor, paddingX, paddingY, children }){
    return (
        <button className={`bg-${bgColor} text-sm text-${txtColor? txtColor: "white"} px-${paddingX} py-${paddingY} rounded-2xl`}>{children}</button>
    )
}