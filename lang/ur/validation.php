<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines (Urdu)
    |--------------------------------------------------------------------------
    |
    | یہ لائنیں تصدیق (validation) کے دوران مختلف غلطیوں کے پیغامات کیلئے ہیں۔
    | Laravel ان پیغامات کو خودکار طور پر استعمال کرے گا۔
    |
    */

    'accepted' => ':attribute کو قبول کرنا ضروری ہے۔',
    'accepted_if' => ':other :value ہو تو :attribute کو قبول کرنا ضروری ہے۔',
    'active_url' => ':attribute ایک درست URL ہونا چاہئے۔',
    'after' => ':attribute :date کے بعد کی تاریخ ہونی چاہئے۔',
    'after_or_equal' => ':attribute :date کے بعد یا برابر کی تاریخ ہونی چاہئے۔',
    'alpha' => ':attribute میں صرف حروف ہونے چاہئیں۔',
    'alpha_dash' => ':attribute میں صرف حروف، اعداد، ڈیش اور انڈر اسکور ہونے چاہئیں۔',
    'alpha_num' => ':attribute میں صرف حروف اور اعداد ہونے چاہئیں۔',
    'array' => ':attribute ایک array ہونا چاہئے۔',
    'before' => ':attribute :date سے پہلے کی تاریخ ہونی چاہئے۔',
    'before_or_equal' => ':attribute :date سے پہلے یا برابر کی تاریخ ہونی چاہئے۔',
    'between' => [
        'numeric' => ':attribute :min اور :max کے درمیان ہونا چاہئے۔',
        'file' => ':attribute :min اور :max کلو بائٹس کے درمیان ہونا چاہئے۔',
        'string' => ':attribute :min اور :max حروف کے درمیان ہونا چاہئے۔',
        'array' => ':attribute میں :min سے :max اشیاء ہونی چاہئیں۔',
    ],
    'boolean' => ':attribute صرف درست یا غلط (true/false) ہونا چاہئے۔',
    'confirmed' => ':attribute کی تصدیق میل نہیں کھاتی۔',
    'current_password' => 'پاس ورڈ غلط ہے۔',
    'date' => ':attribute ایک درست تاریخ ہونی چاہئے۔',
    'date_equals' => ':attribute کی تاریخ :date کے برابر ہونی چاہئے۔',
    'date_format' => ':attribute فارمیٹ :format کے مطابق نہیں ہے۔',
    'different' => ':attribute اور :other مختلف ہونے چاہئیں۔',
    'digits' => ':attribute :digits عدد پر مشتمل ہونا چاہئے۔',
    'digits_between' => ':attribute :min سے :max اعداد کے درمیان ہونا چاہئے۔',
    'dimensions' => ':attribute کی تصویر کے ابعاد غلط ہیں۔',
    'distinct' => ':attribute کی قدر دہرائی نہیں جانی چاہئے۔',
    'email' => ':attribute ایک درست ای میل ایڈریس ہونا چاہئے۔',
    'ends_with' => ':attribute ان میں سے کسی ایک پر ختم ہونا چاہئے: :values۔',
    'enum' => 'منتخب کردہ :attribute درست نہیں ہے۔',
    'exists' => 'منتخب کردہ :attribute درست نہیں ہے۔',
    'file' => ':attribute ایک درست فائل ہونی چاہئے۔',
    'filled' => ':attribute میں ایک قدر ہونا ضروری ہے۔',
    'gt' => [
        'numeric' => ':attribute :value سے زیادہ ہونا چاہئے۔',
        'file' => ':attribute :value کلو بائٹس سے بڑا ہونا چاہئے۔',
        'string' => ':attribute :value حروف سے زیادہ ہونا چاہئے۔',
        'array' => ':attribute میں :value سے زیادہ آئٹمز ہونی چاہئیں۔',
    ],
    'gte' => [
        'numeric' => ':attribute :value کے برابر یا زیادہ ہونا چاہئے۔',
        'file' => ':attribute :value کلو بائٹس کے برابر یا زیادہ ہونا چاہئے۔',
        'string' => ':attribute :value حروف کے برابر یا زیادہ ہونا چاہئے۔',
        'array' => ':attribute میں کم از کم :value آئٹمز ہونی چاہئیں۔',
    ],
    'image' => ':attribute ایک درست تصویر ہونی چاہئے۔',
    'in' => 'منتخب کردہ :attribute درست نہیں ہے۔',
    'in_array' => ':attribute :other میں موجود نہیں ہے۔',
    'integer' => ':attribute ایک عدد (integer) ہونا چاہئے۔',
    'ip' => ':attribute ایک درست IP پتہ ہونا چاہئے۔',
    'ipv4' => ':attribute ایک درست IPv4 پتہ ہونا چاہئے۔',
    'ipv6' => ':attribute ایک درست IPv6 پتہ ہونا چاہئے۔',
    'json' => ':attribute ایک درست JSON سٹرنگ ہونی چاہئے۔',
    'lt' => [
        'numeric' => ':attribute :value سے کم ہونا چاہئے۔',
        'file' => ':attribute :value کلو بائٹس سے کم ہونا چاہئے۔',
        'string' => ':attribute :value حروف سے کم ہونا چاہئے۔',
        'array' => ':attribute میں :value سے کم آئٹمز ہونی چاہئیں۔',
    ],
    'lte' => [
        'numeric' => ':attribute :value کے برابر یا کم ہونا چاہئے۔',
        'file' => ':attribute :value کلو بائٹس کے برابر یا کم ہونا چاہئے۔',
        'string' => ':attribute :value حروف کے برابر یا کم ہونا چاہئے۔',
        'array' => ':attribute میں :value سے زیادہ آئٹمز نہیں ہونی چاہئیں۔',
    ],
    'mac_address' => ':attribute ایک درست MAC پتہ ہونا چاہئے۔',
    'max' => [
        'numeric' => ':attribute :max سے زیادہ نہیں ہوسکتا۔',
        'file' => ':attribute :max کلو بائٹس سے زیادہ نہیں ہوسکتا۔',
        'string' => ':attribute :max حروف سے زیادہ نہیں ہوسکتا۔',
        'array' => ':attribute میں :max سے زیادہ آئٹمز نہیں ہونی چاہئیں۔',
    ],
    'mimes' => ':attribute کی فائل کی قسم: :values ہونی چاہئے۔',
    'mimetypes' => ':attribute کی فائل کی قسم: :values ہونی چاہئے۔',
    'min' => [
        'numeric' => ':attribute کم از کم :min ہونا چاہئے۔',
        'file' => ':attribute کم از کم :min کلو بائٹس کا ہونا چاہئے۔',
        'string' => ':attribute کم از کم :min حروف کا ہونا چاہئے۔',
        'array' => ':attribute میں کم از کم :min آئٹمز ہونی چاہئیں۔',
    ],
    'multiple_of' => ':attribute :value کا ضارب ہونا چاہئے۔',
    'not_in' => 'منتخب کردہ :attribute درست نہیں ہے۔',
    'not_regex' => ':attribute کا فارمیٹ غلط ہے۔',
    'numeric' => ':attribute ایک عدد ہونا چاہئے۔',
    'password' => [
        'letters' => ':attribute میں کم از کم ایک حرف ہونا چاہئے۔',
        'mixed' => ':attribute میں ایک بڑا اور ایک چھوٹا حرف ہونا چاہئے۔',
        'numbers' => ':attribute میں کم از کم ایک عدد ہونا چاہئے۔',
        'symbols' => ':attribute میں کم از کم ایک علامت ہونا چاہئے۔',
        'uncompromised' => 'یہ :attribute ڈیٹا لیک میں پایا گیا ہے۔ براہ کرم نیا :attribute منتخب کریں۔',
    ],
    'present' => ':attribute موجود ہونا چاہئے۔',
    'prohibited' => ':attribute کی اجازت نہیں ہے۔',
    'prohibited_if' => ':other :value ہو تو :attribute کی اجازت نہیں ہے۔',
    'prohibited_unless' => ':other :values میں سے ہو تو :attribute کی اجازت نہیں ہے۔',
    'regex' => ':attribute کا فارمیٹ غلط ہے۔',
    'required' => ':attribute فیلڈ لازمی ہے۔',
    'required_if' => ':other :value ہو تو :attribute فیلڈ ضروری ہے۔',
    'required_unless' => ':other :values میں سے ہو تو :attribute فیلڈ ضروری ہے۔',
    'required_with' => ':values موجود ہو تو :attribute فیلڈ ضروری ہے۔',
    'required_without' => ':values موجود نہ ہو تو :attribute فیلڈ ضروری ہے۔',
    'same' => ':attribute اور :other ایک جیسے ہونے چاہئیں۔',
    'size' => [
        'numeric' => ':attribute :size ہونا چاہئے۔',
        'file' => ':attribute :size کلو بائٹس کا ہونا چاہئے۔',
        'string' => ':attribute :size حروف پر مشتمل ہونا چاہئے۔',
        'array' => ':attribute میں :size آئٹمز ہونی چاہئیں۔',
    ],
    'starts_with' => ':attribute ان میں سے کسی ایک سے شروع ہونا چاہئے: :values۔',
    'string' => ':attribute ایک درست سٹرنگ ہونی چاہئے۔',
    'timezone' => ':attribute ایک درست ٹائم زون ہونا چاہئے۔',
    'unique' => ':attribute پہلے ہی استعمال ہو چکا ہے۔',
    'uploaded' => ':attribute اپ لوڈ کرنے میں ناکام رہا۔',
    'url' => ':attribute ایک درست URL ہونا چاہئے۔',
    'uuid' => ':attribute ایک درست UUID ہونا چاہئے۔',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    */

    'custom' => [
        'email' => [
            'required' => 'ای میل فیلڈ ضروری ہے۔',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    | یہاں آپ اپنی attributes کے نام اردو میں لکھ سکتے ہیں تاکہ error message
    | میں زیادہ readable نام ظاہر ہوں۔
    |--------------------------------------------------------------------------
    */

    'attributes' => [
        'name' => 'نام',
        'email' => 'ای میل',
        'password' => 'پاس ورڈ',
        'phone_no' => 'فون نمبر',
        'role' => 'کردار',
        'title' => 'عنوان',
        'description' => 'تفصیل',
        'image' => 'تصویر',
        'file' => 'فائل',
    ],

];
