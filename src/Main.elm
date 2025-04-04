port module Main exposing (..)

import Browser
import DohnaDohna exposing (Image, Jinzai, JinzaiAttribute, JinzaiAttributes, Looks, Mental, Name, ProfileText, Techinc, Voice, attributes, rankNames, undefinedRandomText, undefinedText, voices)
-- import File.Download as Download
import Html exposing (Html, button, div, h1, h2, input, label, option, p, select, text, textarea)
import Html.Attributes exposing (checked, class, disabled, for, id, placeholder, style, type_, value)
import Html.Events exposing (onClick, onInput)
import List exposing (map)
import List.Extra exposing (setAt)



-- MAIN


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.none
        }



-- MODEL


type CharacterType
    = JinzaiType
    | KokyakuType


type alias Model =
    { characterType : CharacterType
    , jinzai : Jinzai
    , kokyaku :
        { characterType : String
        , image : Image
        , name : String
        , income : Maybe String
        , present : List String
        , target : List String
        , profile : List String
        }
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { characterType = JinzaiType
      , jinzai =
            { image = ""
            , name = Nothing
            , looks = Nothing
            , technic = Nothing
            , mental = Nothing
            , attributes = [ undefinedText, undefinedText, undefinedText ]
            , isVergin = Nothing
            , voice = Nothing
            , profile = [ "", "", "" ]
            }
      , kokyaku =
            { characterType = "コキャク"
            , image = ""
            , name = ""
            , income = Nothing
            , present = [ "" ]
            , target = [ undefinedText, undefinedText, undefinedText ]
            , profile = [ "", "" ]
            }
      }
    , Cmd.none
    )



-- UPDATE


type Msg
    = ChangeCharacterType CharacterType
    | InputJinzaiImage Image
    | InputJinzaiName Name
    | SelectJinzaiLooks Looks
    | SelectJinzaiTechnic Techinc
    | SelectJinzaiMental Mental
    | SelectJinzaiAttribute JinzaiAttribute Int
    | SelectJinzaiVergin Bool
    | SelectJinzaiVoice Voice
    | InputJinzaiProfile ProfileText Int
    | InputKokyakuImage Image
    | InputKokyakuName Name
    | SelectKokyakuIncome String
    | InputKokyakuPresent String Int
    | SelectKokyakuTarget String Int
    | InputKokyakuProfile String Int
    | GenerateIniFile


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ChangeCharacterType characterType ->
            ( { model | characterType = characterType }, Cmd.none )

        InputJinzaiImage image ->
            let
                jinzai =
                    model.jinzai

                updatedJinzai =
                    { jinzai | image = image }
            in
            ( { model | jinzai = updatedJinzai }, Cmd.none )

        InputJinzaiName name ->
            let
                jinzai =
                    model.jinzai

                updatedJinzai =
                    { jinzai | name = viewToModel name }
            in
            ( { model | jinzai = updatedJinzai }, Cmd.none )

        SelectJinzaiLooks rank ->
            let
                jinzai =
                    model.jinzai

                updatedJinzai =
                    { jinzai | looks = viewToModel rank }
            in
            ( { model | jinzai = updatedJinzai }, Cmd.none )

        SelectJinzaiTechnic rank ->
            let
                jinzai =
                    model.jinzai

                updatedJinzai =
                    { jinzai | technic = viewToModel rank }
            in
            ( { model | jinzai = updatedJinzai }, Cmd.none )

        SelectJinzaiMental rank ->
            let
                jinzai =
                    model.jinzai

                updatedJinzai =
                    { jinzai | mental = viewToModel rank }
            in
            ( { model | jinzai = updatedJinzai }, Cmd.none )

        SelectJinzaiAttribute attribute index ->
            let
                jinzai =
                    model.jinzai

                updatedJinzai =
                    { jinzai | attributes = setAt index attribute jinzai.attributes }
            in
            ( { model | jinzai = updatedJinzai }, Cmd.none )

        SelectJinzaiVergin isVergin ->
            let
                jinzai =
                    model.jinzai

                updatedJinzai =
                    { jinzai | isVergin = Just isVergin }
            in
            ( { model | jinzai = updatedJinzai }, Cmd.none )

        SelectJinzaiVoice voice ->
            let
                jinzai =
                    model.jinzai

                updatedJinzai =
                    { jinzai | voice = viewToModel voice }
            in
            ( { model | jinzai = updatedJinzai }, Cmd.none )

        InputJinzaiProfile profileText index ->
            let
                jinzai =
                    model.jinzai

                updatedJinzai =
                    { jinzai | profile = setAt index profileText jinzai.profile }
            in
            ( { model | jinzai = updatedJinzai }, Cmd.none )

        InputKokyakuImage image ->
            let
                kokyaku =
                    model.kokyaku

                updatedKokyaku =
                    { kokyaku | image = image }
            in
            ( { model | kokyaku = updatedKokyaku }, Cmd.none )

        InputKokyakuName name ->
            let
                kokyaku =
                    model.kokyaku

                updatedKokyaku =
                    { kokyaku | name = name }
            in
            ( { model | kokyaku = updatedKokyaku }, Cmd.none )

        SelectKokyakuIncome income ->
            let
                kokyaku =
                    model.kokyaku

                updatedKokyaku =
                    { kokyaku | income = viewToModel income }
            in
            ( { model | kokyaku = updatedKokyaku }, Cmd.none )

        InputKokyakuPresent present index ->
            let
                kokyaku =
                    model.kokyaku

                updatedPresents =
                    if List.length kokyaku.present <= index then
                        kokyaku.present ++ [ present ]

                    else
                        setAt index present kokyaku.present

                updatedKokyaku =
                    { kokyaku | present = updatedPresents }
            in
            ( { model | kokyaku = updatedKokyaku }, Cmd.none )

        SelectKokyakuTarget target index ->
            let
                kokyaku =
                    model.kokyaku

                updatedKokyaku =
                    { kokyaku | target = setAt index target kokyaku.target }
            in
            ( { model | kokyaku = updatedKokyaku }, Cmd.none )

        InputKokyakuProfile profile index ->
            let
                kokyaku =
                    model.kokyaku

                updatedKokyaku =
                    { kokyaku | profile = setAt index profile kokyaku.profile }
            in
            ( { model | kokyaku = updatedKokyaku }, Cmd.none )

        GenerateIniFile ->
            let
                filename =
                    case model.characterType of
                        JinzaiType ->
                            case model.jinzai.name of
                                Just name ->
                                    name ++ ".txt"

                                Nothing ->
                                    "jinzai.txt"

                        KokyakuType ->
                            if model.kokyaku.name /= "" then
                                model.kokyaku.name ++ ".txt"

                            else
                                "kokyaku.txt"

                content =
                    generateIniContent model
            in
            ( model, downloadFile ( filename, content ) )
-- ポートの定義
port downloadFile : ( String, String ) -> Cmd msg


-- VIEW


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


formGroup : String -> Html Msg -> Html Msg
formGroup labelText content =
    div [ style "margin-bottom" "15px" ]
        [ label [ style "display" "block", style "margin-bottom" "5px", style "font-weight" "bold" ] [ text labelText ]
        , content
        ]


generateIniContent : Model -> String
generateIniContent model =
    case model.characterType of
        JinzaiType ->
            let
                jinzai =
                    model.jinzai

                imageRow =
                    "画像=" ++ jinzai.image

                nameRow =
                    case jinzai.name of
                        Just name ->
                            "名前=" ++ name

                        Nothing ->
                            "名前="

                looksRow =
                    case jinzai.looks of
                        Just looks ->
                            "ルックス=" ++ String.left 2 looks

                        Nothing ->
                            "ルックス="

                technicRow =
                    case jinzai.technic of
                        Just technic ->
                            "テクニック=" ++ String.left 2 technic

                        Nothing ->
                            "テクニック="

                mentalRow =
                    case jinzai.mental of
                        Just mental ->
                            "メンタル=" ++ String.left 2 mental

                        Nothing ->
                            "メンタル="

                attributeRows =
                    if List.all (\attr -> attr == undefinedText) jinzai.attributes then
                        String.join "\n" (List.repeat 3 "属性=")
                    else
                        jinzai.attributes
                            |> List.filter (\attr -> attr /= undefinedText)
                            |> List.map (\attr -> "属性=" ++ attr)
                            |> String.join "\n"

                verginRow =
                    case jinzai.isVergin of
                        Just True ->
                            "処女=1"

                        Just False ->
                            "処女=0"

                        Nothing ->
                            "処女="

                voiceRow =
                    case jinzai.voice of
                        Just voice ->
                            "音声=" ++ voice

                        Nothing ->
                            "音声="

                profileRows =
                    if List.all (\profile -> profile == "") jinzai.profile then
                        String.join "\n" (List.repeat 3 "プロフィール=")
                    else
                        jinzai.profile
                            |> List.filter (\profile -> profile /= "")
                            |> List.map (\profile -> "プロフィール=" ++ profile)
                            |> String.join "\n"

                rows =
                    [ imageRow, nameRow, looksRow, technicRow, mentalRow, attributeRows, verginRow, voiceRow, profileRows ]
                        |> List.filter (\row -> row /= "")
                        |> String.join "\n"
            in
            rows

        KokyakuType ->
            let
                kokyaku =
                    model.kokyaku

                typeRow =
                    "種類=" ++ kokyaku.characterType

                imageRow =
                    "画像=" ++ kokyaku.image

                nameRow =
                    "名前=" ++ kokyaku.name

                incomeRow =
                    case kokyaku.income of
                        Just income ->
                            "インカム=" ++ String.left 2 income

                        Nothing ->
                            "インカム="

                presentRows =
                    kokyaku.present
                        |> List.filter (\present -> present /= "")
                        |> List.map (\present -> "プレゼント=" ++ present)
                        |> String.join "\n"

                targetRows =
                    if List.all (\target -> target == undefinedText) kokyaku.target then
                        String.join "\n" (List.repeat 3 "ターゲット=")
                    else
                        kokyaku.target
                            |> List.filter (\target -> target /= undefinedText)
                            |> List.map (\target -> "ターゲット=" ++ target)
                            |> String.join "\n"

                profileRows =
                    if List.all (\profile -> profile == "") kokyaku.profile then
                        String.join "\n" (List.repeat 2 "プロフィール=")
                    else
                        kokyaku.profile
                            |> List.filter (\profile -> profile /= "")
                            |> List.map (\profile -> "プロフィール=" ++ profile)
                            |> String.join "\n"

                rows =
                    [ typeRow, imageRow, nameRow, incomeRow, presentRows, targetRows, profileRows ]
                        |> List.filter (\row -> row /= "")
                        |> String.join "\n"
            in
            rows


view : Model -> Html Msg
view model =
    div [ style "padding" "20px", style "max-width" "800px", style "margin" "0 auto" ]
        [ h1 [ style "text-align" "center" ] [ text "ドーナドーナ キャラクターエディター" ]
        , div [ style "display" "flex", style "justify-content" "center", style "margin-bottom" "20px" ]
            [ div [ style "margin-right" "20px" ]
                [ input [ type_ "radio", id "jinzai", checked (model.characterType == JinzaiType), onClick (ChangeCharacterType JinzaiType) ] []
                , label [ for "jinzai", style "margin-left" "5px" ] [ text "ジンザイ" ]
                ]
            , div []
                [ input [ type_ "radio", id "kokyaku", checked (model.characterType == KokyakuType), onClick (ChangeCharacterType KokyakuType) ] []
                , label [ for "kokyaku", style "margin-left" "5px" ] [ text "コキャク" ]
                ]
            ]
        , case model.characterType of
            JinzaiType ->
                viewJinzaiForm model.jinzai

            KokyakuType ->
                viewKokyakuForm model.kokyaku
        , div [ style "margin-top" "30px", style "text-align" "center" ]
            [ button
                [ onClick GenerateIniFile
                , style "padding" "10px 20px"
                , style "background-color" "#4CAF50"
                , style "color" "white"
                , style "border" "none"
                , style "border-radius" "4px"
                , style "cursor" "pointer"
                , style "font-size" "16px"
                ]
                [ text ".txtファイルを生成してダウンロード" ]
            ]
        ]


viewJinzaiForm : Jinzai -> Html Msg
viewJinzaiForm jinzai =
    div []
        [ h2 [] [ text "ジンザイ設定" ]
        , formGroup "画像ファイル名" <|
            input
                [ placeholder "画像ファイル名を入力してください"
                , value jinzai.image
                , onInput InputJinzaiImage
                , style "width" "100%"
                ]
                []
        , formGroup "名前 (最大6文字)" <|
            input
                [ placeholder "名前を入力してください"
                , value (modelToView jinzai.name "")
                , onInput InputJinzaiName
                , style "width" "100%"
                ]
                []
        , formGroup "ルックス" <|
            select
                [ value (modelToView jinzai.looks undefinedRandomText)
                , onInput SelectJinzaiLooks
                , style "width" "100%"
                ]
                (map (\rank -> option [ value rank ] [ text rank ]) rankNames)
        , formGroup "テクニック" <|
            select
                [ value (modelToView jinzai.technic undefinedRandomText)
                , onInput SelectJinzaiTechnic
                , style "width" "100%"
                ]
                (map (\rank -> option [ value rank ] [ text rank ]) rankNames)
        , formGroup "メンタル" <|
            select
                [ value (modelToView jinzai.mental undefinedRandomText)
                , onInput SelectJinzaiMental
                , style "width" "100%"
                ]
                (map (\rank -> option [ value rank ] [ text rank ]) rankNames)
        , formGroup "属性 (最大3つ)" <|
            div []
                [ div [ style "margin-bottom" "10px" ]
                    [ select
                        [ onInput (\value -> SelectJinzaiAttribute value 0)
                        , value (attributesToValue jinzai.attributes 0)
                        , style "width" "100%"
                        ]
                        (map (\attribute -> option [ value attribute ] [ text attribute ]) attributes)
                    ]
                , div [ style "margin-bottom" "10px" ]
                    [ select
                        [ onInput (\value -> SelectJinzaiAttribute value 1)
                        , value (attributesToValue jinzai.attributes 1)
                        , style "width" "100%"
                        ]
                        (map (\attribute -> option [ value attribute ] [ text attribute ]) attributes)
                    ]
                , div [ style "margin-bottom" "10px" ]
                    [ select
                        [ onInput (\value -> SelectJinzaiAttribute value 2)
                        , value (attributesToValue jinzai.attributes 2)
                        , style "width" "100%"
                        ]
                        (map (\attribute -> option [ value attribute ] [ text attribute ]) attributes)
                    ]
                ]
        , formGroup "処女設定" <|
            div [ style "display" "flex" ]
                [ div [ style "margin-right" "20px" ]
                    [ input
                        [ type_ "radio"
                        , id "vergin-yes"
                        , checked (jinzai.isVergin == Just True)
                        , onClick (SelectJinzaiVergin True)
                        ]
                        []
                    , label [ for "vergin-yes", style "margin-left" "5px" ] [ text "処女 (1)" ]
                    ]
                , div []
                    [ input
                        [ type_ "radio"
                        , id "vergin-no"
                        , checked (jinzai.isVergin == Just False)
                        , onClick (SelectJinzaiVergin False)
                        ]
                        []
                    , label [ for "vergin-no", style "margin-left" "5px" ] [ text "非処女 (0)" ]
                    ]
                ]
        , formGroup "音声" <|
            select
                [ value (modelToView jinzai.voice undefinedRandomText)
                , onInput SelectJinzaiVoice
                , style "width" "100%"
                ]
                (map (\voice -> option [ value voice ] [ text voice ]) voices)
        , formGroup "プロフィール (最大3行)" <|
            div []
                [ div [ style "margin-bottom" "10px" ]
                    [ textarea
                        [ placeholder "1行目"
                        , value (List.head jinzai.profile |> Maybe.withDefault "")
                        , onInput (\value -> InputJinzaiProfile value 0)
                        , style "width" "100%"
                        , style "height" "60px"
                        ]
                        []
                    ]
                , div [ style "margin-bottom" "10px" ]
                    [ textarea
                        [ placeholder "2行目"
                        , value (List.head (List.drop 1 jinzai.profile) |> Maybe.withDefault "")
                        , onInput (\value -> InputJinzaiProfile value 1)
                        , style "width" "100%"
                        , style "height" "60px"
                        ]
                        []
                    ]
                , div [ style "margin-bottom" "10px" ]
                    [ textarea
                        [ placeholder "3行目"
                        , value (List.head (List.drop 2 jinzai.profile) |> Maybe.withDefault "")
                        , onInput (\value -> InputJinzaiProfile value 2)
                        , style "width" "100%"
                        , style "height" "60px"
                        ]
                        []
                    ]
                ]
        ]


viewKokyakuForm : { characterType : String, image : String, name : String, income : Maybe String, present : List String, target : List String, profile : List String } -> Html Msg
viewKokyakuForm kokyaku =
    div []
        [ h2 [] [ text "コキャク設定" ]
        , formGroup "画像ファイル名" <|
            input
                [ placeholder "画像ファイル名を入力してください"
                , value kokyaku.image
                , onInput InputKokyakuImage
                , style "width" "100%"
                ]
                []
        , formGroup "名前 (最大6文字)" <|
            input
                [ placeholder "名前を入力してください"
                , value kokyaku.name
                , onInput InputKokyakuName
                , style "width" "100%"
                ]
                []
        , formGroup "インカム" <|
            select
                [ value (modelToView kokyaku.income undefinedRandomText)
                , onInput SelectKokyakuIncome
                , style "width" "100%"
                ]
                (map (\rank -> option [ value rank ] [ text rank ]) rankNames)
        , formGroup "プレゼント" <|
            div []
                [ div [ style "margin-bottom" "10px" ]
                    [ input
                        [ placeholder "プレゼント (例: LKS↑↑, TEC↓)"
                        , value (List.head kokyaku.present |> Maybe.withDefault "")
                        , onInput (\value -> InputKokyakuPresent value 0)
                        , style "width" "100%"
                        ]
                        []
                    ]
                ]
        , formGroup "ターゲット (最大3つ)" <|
            div []
                [ div [ style "margin-bottom" "10px" ]
                    [ select
                        [ onInput (\value -> SelectKokyakuTarget value 0)
                        , value (attributesToValue kokyaku.target 0)
                        , style "width" "100%"
                        ]
                        (map (\attribute -> option [ value attribute ] [ text attribute ]) attributes)
                    ]
                , div [ style "margin-bottom" "10px" ]
                    [ select
                        [ onInput (\value -> SelectKokyakuTarget value 1)
                        , value (attributesToValue kokyaku.target 1)
                        , style "width" "100%"
                        ]
                        (map (\attribute -> option [ value attribute ] [ text attribute ]) attributes)
                    ]
                , div [ style "margin-bottom" "10px" ]
                    [ select
                        [ onInput (\value -> SelectKokyakuTarget value 2)
                        , value (attributesToValue kokyaku.target 2)
                        , style "width" "100%"
                        ]
                        (map (\attribute -> option [ value attribute ] [ text attribute ]) attributes)
                    ]
                ]
        , formGroup "プロフィール (最大2行)" <|
            div []
                [ div [ style "margin-bottom" "10px" ]
                    [ textarea
                        [ placeholder "1行目"
                        , value (List.head kokyaku.profile |> Maybe.withDefault "")
                        , onInput (\value -> InputKokyakuProfile value 0)
                        , style "width" "100%"
                        , style "height" "60px"
                        ]
                        []
                    ]
                , div [ style "margin-bottom" "10px" ]
                    [ textarea
                        [ placeholder "2行目"
                        , value (List.head (List.drop 1 kokyaku.profile) |> Maybe.withDefault "")
                        , onInput (\value -> InputKokyakuProfile value 1)
                        , style "width" "100%"
                        , style "height" "60px"
                        ]
                        []
                    ]
                ]
        ]
