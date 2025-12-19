<?php

namespace Database\Seeders;

use App\Models\State;
use App\Models\LGA;
use App\Models\Ward;
use Illuminate\Database\Seeder;

class WardsSeeder extends Seeder
{
    public function run(): void
    {
        $data = $this->getWardsData();

        foreach ($data as $stateName => $lgas) {
            $state = State::create([
                'name' => $stateName,
                'abbreviation' => strtoupper(substr($stateName, 0, 2)),
                'sort_order' => 0,
            ]);

            $lgaOrder = 1;
            foreach ($lgas as $lgaName => $wards) {
                $lga = LGA::create([
                    'state_id' => $state->id,
                    'name' => $lgaName,
                    'sort_order' => $lgaOrder++,
                ]);

                $wardOrder = 1;
                foreach ($wards as $wardName) {
                    Ward::create([
                        'lga_id' => $lga->id,
                        'state_id' => $state->id,
                        'name' => $wardName,
                        'sort_order' => $wardOrder++,
                    ]);
                }
            }
        }
    }

    private function getWardsData(): array
    {
        return [
            'Abia' => [
                'Aba North' => ['Ariaria', 'Asaokpuaja', 'Eziama Ward', 'Industrial', 'Ogbor 1', 'Ogbor 2', 'Old Gra', 'Osusu 1', 'Osusu 2', 'St Eugene', 'Umuogor/Asaokpulor', 'Umuola', 'Uratta'],
                'Aba South' => ['Aba River', 'Aba Town Hall', 'Asa', 'Ekeoha', 'Elu Ohazu', 'Eyimba', 'Eziukwu 1/2', 'Glocester', 'Igwebuike', 'Iheorji', 'Mosque', 'Ngwa 1/2', 'Okporo Enyi', 'Umuogele/Ohazu 2'],
                'Arochukwu' => ['Arochukwu 1', 'Arochukwu 2', 'Arochukwu 3', 'Arochukwu 4', 'Ebemoha', 'Eleoha Ihe 1', 'Eleoha Ihe 2', 'Eleoha Ututu', 'Etiti Abam/Ovukwu', 'Ikwun Ihe 1', 'Isu', 'Ohaeke', 'Ohafor 1', 'Ohafor 2', 'Ovukwu', 'Ututu'],
                'Bende' => ['Alayi 1', 'Alayi 2', 'Bende', 'Igbere 1', 'Igbere 2', 'Igbere 3', 'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Itumbuzo 1', 'Itumbuzo 2', 'Nkpa 1', 'Nkpa 2', 'Ozuitem', 'Ugwueke', 'Umuhu/Ezechi', 'Umuimenyi', 'Uzuakoli 1', 'Uzuakoli 2'],
                'Ikwuano' => ['Agbala-Ozu', 'Ajatanigu', 'Ariam 1', 'Ariam 2', 'Ekpiri', 'Ibere 1', 'Ibere 2', 'Ikemba', 'Oboro 1', 'Oboro 2', 'Oboro 3', 'Oboro 4', 'Oloko 1', 'Oloko 2/Azuiyi', 'Ugwuegbu', 'Uhalauda/Oruigwe', 'Umudike', 'Usaka'],
                'Isiala-Ngwa North' => ['Achiudo', 'Ahiabaubi/Umuchima', 'Amaasa Nsulu', 'Amano Nsulu', 'Amapu Ntigha', 'Amasa Ntigha', 'Eziama Ntigha', 'Ihie', 'Isiala Amapu', 'Isiala Enyiala', 'Isiala Nsulu/Isiala Amapu', 'Ngwaukwu 1/Abayi/Amaorji', 'Ngwaukwu 2', 'Orianauga', 'Umuelemoha', 'Umunna Nsulu/Agburuezeukwu', 'Umuoha', 'Umuomainta'],
                'Isiala-Ngwa South' => ['Aku-Na-Ekpu', 'Alaukwu', 'Amaise', 'Amaise Ahaba', 'Amaitolu', 'Ehi-Na-Uguru', 'Ikeala Mbutu', 'Mbutu Ngwa', 'Mbutu Ukwu/Anya Mbutu', 'Ngwaobi', 'Obintu-Mbutu', 'Okporo Ahaba', 'Omoba', 'Osokwa', 'Ovungwu', 'Ovuokwu', 'Owerre/Oche'],
                'Isuikwuato' => ['Achara', 'Amaiyiobiliohia/Nunya', 'Eluama', 'Ezere', 'Ikeagha 1', 'Ikeagha 2', 'Imenyi 1/2', 'Isiala Amawu/Obialaugo', 'Isunabo', 'Ndundu', 'Oguduasa/Acha/Amachara', 'Ovim', 'Ugwuele/Ngodo', 'Umuanyi/Absu', 'Umuasua', 'Umunnekwu 1', 'Umunnekwu 2'],
                'Obi Nwga' => ['Abayi 1', 'Abayi 2', 'Ahiaba/Abala', 'Akpaa Mbato', 'Akumaimo', 'Alaukwu Ohanze', 'Isiala Itu', 'Mgboko Amiri', 'Mgboko Itungwa', 'Mgboko Umuanunu 1', 'Mgboko Umuanunu 2', 'Ndiakata', 'Ntighauzor'],
                'Ohafia' => ['Agboji', 'Akanukwu', 'Ameke 1', 'Ameke 2', 'Amibezioke', 'Amiyiumuokwuru', 'Amogudu/Amaogudu Abiriba', 'Ania', 'Ebemoha', 'Isiama/Uduma', 'Ndi Elu', 'Ndi Etiti', 'Ndiagbo', 'Ohafor', 'Okamu', 'Owuwanyanwu', 'Ugwufie'],
                'Osisioma Ngwa' => ['Amaise Amapuife', 'Amaitolu', 'Amasaa', 'Amasator', 'Amator', 'Amavo Etiti', 'Amavo-Nkworgu', 'Arongwa', 'Isiala Okpu', 'Mbutu Oma', 'Mbutu Umuojima', 'Ode-Okwu', 'Okpu-Umuobo', 'Osokwa', 'Otu-Obi', 'Umunneise', 'Uratta', 'Uratta Amaise'],
                'Ugwunagbo' => ['Abayi Mbasaa', 'Amapu Ideobia/Ward Three', 'Asa Umunka/Ward Seven', 'Ihie Obeaku 9', 'Ihie Ukwu/Ward Nine', 'Ngwaiyiekwe/Ward Ten', 'Obeaja/Ward Two', 'Obegu/Ward One', 'Owerri Aba/Ward Four', 'Umuada/Ward Five', 'Umuarukwu/Ward Six', 'Umugo/Ward Eight'],
                'Ukwa East' => ['Akwete Ohandu', 'Amakam Akwete', 'Azumini', 'Ikuorie', 'Ikwueke West', 'Ikwuriato West', 'Ikwuriator East', 'Mbam-Abuo', 'Mpukpuaja Ogbuagu', 'Obeaku', 'Obohia', 'Ohambele', 'Ohuru Mkporobe', 'Umuigube Achara'],
                'Ukwa West' => ['Asa North/Umuiku Isi Asa', 'Asa South 1/2', 'Ipu East', 'Ipu South', 'Ipu West', 'Obokwe 1/2', 'Obuzor', 'Ogwe', 'Ozaa Ukwu 1', 'Ozaa Ukwu 2', 'Ozaa West'],
                'Umuahia North' => ['Afaraukwu', 'Afugiri 1', 'Afugiri 2', 'Ibeku East 1', 'Ibeku East 2', 'Ibeku West', 'Isingwu', 'Mbaocha', 'Ndume/Azueke', 'Nkwoachara', 'Nkwoegwu', 'Okaiuga-Alike', 'Oriendu', 'Ugba Urban 4', 'Umuhu', 'Urban 1', 'Urban 2', 'Urban 3', 'Urban 5'],
                'Umuahia South' => ['Ahiaukwu A/Amangwu', 'Ahiaukwu B/Eziama', 'Amakama', 'Ezeleke', 'Nsirimo', 'Ogbodi Ukwu', 'Ohiocha', 'Old Umuahia', 'Omaegwu', 'Ubakala A', 'Ubakala B'],
                'Umu-Nneochi' => ['Amauba/Umuogbuele', 'Amorie', 'Amuda', 'Aroikpa', 'Eziama Agbor', 'Eziama Ugwu', 'Ezingodo', 'Lekwesi', 'Leru', 'Lokpanta', 'Lokpaukwu', 'Mbala/Achara', 'Obinolu/Obiagu/Lomara', 'Obinulo/Uhude/Umuogbokocha', 'Ubahu/Akawa', 'Umuaku 1', 'Umuaku 2', 'Umudim/Uhuloghu', 'Umuobasi'],
            ],
            'Katsina' => [
                'Bakori' => ['Bakori A', 'Bakori B', 'Barde Kwantakwaran', 'Dawa Musa', 'Guga', 'Jargaba', 'Kabomo', 'Kakumi', 'Kandarawa', 'Kurami Yankwani', 'Tsiga'],
                'Katsina' => ['Arewa 1', 'Arewa 2', 'Gabas 1', 'Gabas 2', 'Gabas 3', 'Kudu 1', 'Kudu 2', 'Kudu 3', 'Shinkafi 1', 'Shinkafi 2', 'Yamma 1', 'Yamma 2'],
            ],
            'Kano' => [
                'Ajingi' => ['Ajingi', 'Balare', 'Chula', 'Dabin-Kanawa', 'Dundun', 'Gafasa', 'Gurduba', 'Kunkurawa', 'Toranke', 'Unguwar Bai'],
            ],
            'Zamfara' => [
                'Anka' => ['Bagega', 'Barayar Zaki', 'Dangaladima', 'Galadima', 'Magaji', 'Matseri', 'Sabon Birni', 'Waramu', 'Wuya', 'Yarsabaya'],
            ],
        ];
    }
}
