module Main exposing (..)

import Browser
import DohnaDohna exposing (Image, Jinzai, Name, RankName)
import Html exposing (Html, div, input, label, option, select, text)
import Html.Attributes exposing (placeholder, type_, value)
import Html.Events exposing (onInput)
import List exposing (map)
import Maybe exposing (withDefault)
import String exposing (isEmpty)



-- MAIN


main =
    Browser.sandbox { init = init, update = update, view = view }



-- MODEL


init : Jinzai
init =
    { image = ""
    , name = "未設定（ランダム）"
    , looks = "未設定（ランダム）"
    , techinc = "未設定（ランダム）"
    , mental = "未設定（ランダム）"
    , attribute = [ "" ]
    , isVergin = "Random"
    , voice = "未設定（ランダム）"
    , profile = "未設定（ランダム）"
    }



--


rankNames : List String
rankNames =
    [ "未設定（ランダム）"
    , "S+ (神話級)"
    , "S (伝説級)"
    , "A+ (世界級)"
    , "A (全国級)"
    , "B+ (かなり優秀)"
    , "B (優秀)"
    , "C+ (やや優秀)"
    , "C (一般的)"
    , "D+ (劣っている)"
    , "D (能力が皆無)"
    ]



-- type RankName = Ｓプラス | Ｓ | Ａプラス | Ａ | Ｂプラス | Ｂ | Ｃプラス | Ｃ | Ｄプラス | Ｄ
-- type alias Looks = RankName
-- type alias Techinc = RankName
-- type alias Mental = RankName
-- type Attribute = 巨乳|貧乳|安産型|脚線美|玉の肌|筋肉質|着やせ|名器|外傷|骨折|
-- 	車椅子|低血圧|病弱|失明|タトゥ|ピアス|敏感|体臭|令嬢|有名人|
-- 	委員長|優等生|運動部|補導歴|生活難|彼氏有|彼女有|既婚|経産婦|人気者|
-- 	王子様|愛嬌|クール|無口|強情|前向き|一途|照れ屋|臆病|従順|
-- 	正義感|真面目|小悪魔|高飛車|潔癖|無垢|えっち|変態|癒し系|
-- 	ゆるい|不思議|心の闇|自虐的|サイコ|上品|家庭的|魔性|
--   二形|男の娘|泥中蓮|無双|無相|無想|
-- type alias Attributes = List Attribute
-- type alias IsVergin = Bool
-- type Voice =  女子汎用／大／真面目|女子汎用／大／陽気|女子汎用／大／強気|
-- 	女子汎用／高／真面目|女子汎用／高／活発|女子汎用／高／陽気|女子汎用／高／控え目|女子汎用／高／無邪気|
-- 	女子汎用／中／真面目|女子汎用／中／活発|女子汎用／中／控え目|
-- 	女子汎用／小／無邪気|女子汎用／小／勝ち気|女子汎用／小／控え目
-- type alias ProfileText = String
-- type alias JinzaiProfileTexts = List ProfileText
-- type Present = Attribute |
--   LKS_doubleDown | LKS_down | LKS_up | LKS_doubleUp
--   TEC_doubleDown | TEC_down | TEC_up | TEC_doubleUp
--   MEN_doubleDown | MEN_down | MEN_up | MEN_doubleUp
-- UPDATE


type Msg
    = InputImage Image
    | InputName Name
    | SelectLooks RankName


update : Msg -> Jinzai -> Jinzai
update msg jinzai =
    case msg of
        InputImage newImage ->
            { jinzai | image = newImage }

        InputName newName ->
            { jinzai | name = newName }

        SelectLooks newRank ->
            { jinzai | looks = newRank }



-- VIEW
-- 与えられた文字列のリストをdivタグで囲んで表示するビュー関数


viewList : List String -> Html Msg
viewList items =
    div []
        (List.map (\item -> div [] [ text item ]) items)


view : Jinzai -> Html Msg
view jinzai =
    div []
        [ div []
            [ label [] [ text "画像ファイル名" ]
            , input [ placeholder "画像ファイル名を入力してください", value jinzai.image, onInput InputName ] []
            , div [] [ text jinzai.image ]
            ]
        , div []
            [ label [] [ text "名前" ]
            , input [ placeholder "名前を入力してください", value jinzai.name, onInput InputName ] []
            , div [] [ text jinzai.name ]
            ]
        , div []
            [ label [] [ text "ルックス" ]
            , select [ value jinzai.looks, onInput SelectLooks ]
                (map (\rank -> option [ value rank ] [ text rank ]) rankNames)
            , div [] [ text jinzai.looks ]
            ]
        ]
