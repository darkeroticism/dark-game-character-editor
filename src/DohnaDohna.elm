module DohnaDohna exposing (Image, Jinzai, Name, RankName)


type alias Image =
    String


type alias Name =
    String


type alias RankName =
    String


type alias Looks =
    RankName


type alias Techinc =
    RankName


type alias Mental =
    RankName


type alias Attribute =
    String


type alias Attributes =
    List Attribute


type IsVergin
    = Bool
    | Random


type alias Voice =
    String


type alias ProfileText =
    String


type alias JinzaiProfileTexts =
    List ProfileText


type alias Present =
    String


type alias Presents =
    List Present


type alias KokyakuProfileTexts =
    List ProfileText


type alias Jinzai =
    { image : Image
    , name : Name
    , looks : Looks
    , techinc : Techinc
    , mental : Mental
    , attribute : Attributes
    , isVergin : IsVergin
    , voice : Voice
    , profile : JinzaiProfileTexts
    }


type alias Kokyaku =
    { characterType : String
    , image : Image
    , name : Name
    , income : Maybe RankName
    , present : List String
    , target : Attributes
    , profile : Maybe KokyakuProfileTexts
    }
