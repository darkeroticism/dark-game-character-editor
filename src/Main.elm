module Main exposing (..)

import Browser
import DohnaDohna exposing (Image, Jinzai, JinzaiAttribute, JinzaiAttributes, Looks, Mental, Name, Techinc, attributes, rankNames, undefinedRandomText, undefinedText)
import Html exposing (Html, div, input, label, option, select, text)
import Html.Attributes exposing (placeholder, value)
import Html.Events exposing (onInput)
import List exposing (map)
import List.Extra exposing (setAt)



-- MAIN


main : Program () Jinzai Msg
main =
    Browser.sandbox { init = init, update = update, view = view }



-- MODEL


init : Jinzai
init =
    { image = ""
    , name = Nothing
    , looks = Nothing
    , technic = Nothing
    , mental = Nothing
    , attributes = [ undefinedText, undefinedText, undefinedText ]
    , isVergin = Nothing
    , voice = Nothing
    , profile = Nothing
    }



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
    | SelectLooks Looks
    | SelectTechnic Techinc
    | SelectMental Mental
    | SelectAttribute JinzaiAttribute Int


update : Msg -> Jinzai -> Jinzai
update msg jinzai =
    case msg of
        InputImage newImage ->
            { jinzai | image = newImage }

        InputName newName ->
            { jinzai | name = viewToModel newName }

        SelectLooks newRank ->
            { jinzai | looks = viewToModel newRank }

        SelectTechnic newRank ->
            { jinzai | technic = viewToModel newRank }

        SelectMental newRank ->
            { jinzai | mental = viewToModel newRank }

        SelectAttribute newAttribute index ->
            { jinzai | attributes = setAt index newAttribute jinzai.attributes }



-- VIEW
-- 与えられた文字列のリストをdivタグで囲んで表示するビュー関数


modelToView : Maybe String -> String -> String
modelToView maybeValue defaultString =
    case maybeValue of
        Just value ->
            value

        Nothing ->
            defaultString


attributesToValue : JinzaiAttributes -> Int -> String
attributesToValue attributes index =
    attributes
        |> (\value -> List.head (List.drop index value))
        |> (\value -> modelToView value undefinedText)


viewToModel : String -> Maybe String
viewToModel string =
    if string == undefinedText || string == undefinedRandomText || string == "" then
        Nothing

    else
        Just string


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
            , input [ placeholder "名前を入力してください", value (modelToView jinzai.name ""), onInput InputName ] []
            , div [] [ text (modelToView jinzai.name undefinedRandomText) ]
            ]
        , div []
            [ label [] [ text "ルックス" ]
            , select [ value (modelToView jinzai.looks undefinedRandomText), onInput SelectLooks ]
                (map (\rank -> option [ value rank ] [ text rank ]) rankNames)
            , div [] [ text (modelToView jinzai.looks undefinedRandomText) ]
            ]
        , div []
            [ label [] [ text "テクニック" ]
            , select [ value (modelToView jinzai.technic undefinedRandomText), onInput SelectTechnic ]
                (map (\rank -> option [ value rank ] [ text rank ]) rankNames)
            , div [] [ text (modelToView jinzai.technic undefinedRandomText) ]
            ]
        , div []
            [ label [] [ text "メンタル" ]
            , select [ value (modelToView jinzai.mental undefinedRandomText), onInput SelectMental ]
                (map (\rank -> option [ value rank ] [ text rank ]) rankNames)
            , div [] [ text (modelToView jinzai.mental undefinedRandomText) ]
            ]
        , div []
            [ label [] [ text "属性" ]
            , select [ onInput (\value -> SelectAttribute value 0) ]
                (map (\attribute -> option [ value attribute ] [ text attribute ]) attributes)
            , div [] [ text <| attributesToValue jinzai.attributes 0 ]
            , select [ onInput (\value -> SelectAttribute value 1) ]
                (map (\attribute -> option [ value attribute ] [ text attribute ]) attributes)
            , div [] [ text <| attributesToValue jinzai.attributes 1 ]
            , select [ onInput (\value -> SelectAttribute value 2) ]
                (map (\attribute -> option [ value attribute ] [ text attribute ]) attributes)
            , div [] [ text <| attributesToValue jinzai.attributes 2 ]
            ]
        ]
