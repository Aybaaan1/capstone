import Image from "next/image";
import Button from "./_components/Button";

export default function Home(){

    const Merchandise = [
        {picture: "/imgs/tshirt.png", item: "University T-Shirt", price: "250.00"},
        {picture: "/imgs/lanyards.png", item: "Department Lanyards", price: "85.00"},
        {picture: "/imgs/totebag.png", item: "University Tote Bag", price: "160.00"},
        {picture: "/imgs/flask.png", item: "University Tumbler", price: "299.00"},
    ]

    const sociallinks = [
        {image: "/imgs/fb-icon.png", href: "/"},
        {image: "/imgs/twitter-icon.png", href: "/"},
        {image: "/imgs/instagram-icon.png", href: "/"},
        {image: "/imgs/youtube-icon.png", href: "/"}
    ]

    return (
        <div className=" w-full bg-white">
            <section className="flex items-center justify-center border-b-2 border-gray-100 h-[513px] gap-20" >
                <div className="text-black flex flex-col gap-6 h-[300px]">
                    <h1 className="font-bold text-7xl" >SSG <br /> Connect</h1>
                    <p className="text-slate-600">Empowering CTU-AC Students through <br />
                    Digital Platforms Services.</p>
                    <div>
                        <button className="bg-primary px-10 py-2 text-white rounded-2xl text-sm">Chat Us</button>
                    </div>
                </div>
                <Image src="/imgs/ssg-group-pic.png" height={550} width={550} alt="ssg group pic"/>
            </section>
            <section className= "text-black flex flex-col items-center justify-center py-16 px-40 gap-10">
                <h1 className="font-bold text-4xl">About Us</h1>
                <p>The SSG Connect is a comprehensive digital platform meticulously designed to streamline student services and enhance engagement within CTU Argao (CTU-AC). Through its innovative features and user-friendly interface, this system aims to empower students by providing convenient access to essential resources and support systems
                </p>
            </section>
            <section className=" text-black w-full bg-slate-50 flex flex-col items-center justify-center py-16 gap-10">
                <h1 className="font-bold text-4xl text-black">University Merchandise</h1>
                <div className="flex items-center justify-between w-4/5">
                    {Merchandise.map((merchs) =>(
                        <div className="text-black flex flex-col gap-3 bg-white py-9 px-5 rounded-xl">
                            <Image src={merchs.picture} height={200} width={200} alt="Item picture"/>
                            <p>{merchs.item}</p>
                            <p>Price: P{merchs.price}</p>
                            <div>
                                <button className="bg-primary text-white  px-3 py-2 rounded-full">Order now</button>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="border-black border px-10 py-3 rounded-full">Explore more</button>
            </section>
            <section className="flex items-center justify-between px-24 overflow-hidden">
                <div className="text-black w-[450px] flex flex-col gap-7">
                    <h1 className="font-medium text-4xl">Follow us</h1>
                    <div className="flex flex-col ">
                    <p className="text-slate-600">@https://www.facebook.com/SSGCTUArgao</p>
                    <p className="text-slate-600">To stay updated with the latest news, promotions, and offerings from the poke , make sure to follow us social media accounts. Don't miss out on any  updates</p>
                    </div>
                    <div className="flex pr-48 items-center justify-between">
                        {
                            sociallinks.map((links) => (
                                <Image src={links.image} href={links.href} height={40} width={40}/>
                            ))
                        }
                    </div>
                </div>
                <Image src="/imgs/followus_group_pic.png" height={450} width={450}/>
            </section>
        </div>
    )
}