/**
 * Definition for bundle. See source for details.
 *
 * @class Oskari.elf.lang.overrides.Bundle
 */
Oskari.clazz.define(
    'Oskari.file-upload.Bundle',
    function () {},
    {
        create: function () {
            var inst = Oskari.clazz.create('Oskari.file-upload.BundleInstance');
            return inst;
        },
        start: function () {},
        stop: function () {}
    },
    {
        source: {
            scripts: [
                {
                    type: 'text/javascript',
                    src: './instance.js'
                }
            ],
            locales: [
                {
                    lang: 'fi',
                    type: 'text/javascript',
                    src: './resources/locale/fi.js'
                }
            ]
        }
    }
);

Oskari.bundle_manager.installBundleClass(
    'file-upload',
    'Oskari.file-upload.Bundle'
);
