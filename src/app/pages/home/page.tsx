import Menubar from '../../components/Menu-Bar'
import PokemonGrid from '@/app/components/pokemon-Grid'
export default function Home(){
    return(
    <div className="min-h-screen bg-[#ffff]">
        <Menubar/>
        <div className='container mx-auto p-4'>
            <PokemonGrid/>
        </div>        
    </div>
        

)
}