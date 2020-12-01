import React, { useState } from 'react';
import { Drawer, Button, Badge, Radio } from 'antd';
import 'antd/es/radio/style/index.js';
import 'antd/es/button/style/index.js';
import 'antd/es/drawer/style/index.js';
import 'antd/es/tooltip/style/index.js';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Message } from 'oskari-ui';
import { Layer } from './Layer';

const StyledRootEl = styled('div')`
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 50;
    > button {
        margin-right: 10px;
    }
`;

export const MainPanel = ({ service, bbox, drawControl, isDrawing }) => {
    const roles = service.getRoles();
    const [layerSelectVisible, showLayerSelect] = useState(true);
    const [currentRole, setRole] = useState(roles[0]);
    let layers = service.getLayers(currentRole);
    const changeRole = (role) => {
        setRole(role);
        layers = service.getLayers(role);
    };
    const removeBBOX = () => {
        drawControl();
        drawControl();
    };
    const hasLayers = layers.length > 0;
    return (
        <React.Fragment>
            <StyledRootEl>
                <Radio.Group value={currentRole} style={{ float: 'left' }} onChange={(evt) => changeRole(evt.target.value)}>
                    { roles.map(role => (<Radio.Button key={role} style={{ display: 'block' }} value={role}>{ role }</Radio.Button>)) }
                </Radio.Group>
                <Button onClick={drawControl}>
                    { isDrawing ? <Message messageKey='buttons.endDraw' /> : <Message messageKey='buttons.drawSelection' /> }
                </Button>
                <Badge count={layers.length}>
                    <Button type="primary" onClick={() => showLayerSelect(!layerSelectVisible)}>
                        <Message messageKey='buttons.layerSelection' />
                    </Button>
                </Badge>
            </StyledRootEl>
            <Drawer
                title={<Message messageKey='layerSelection.title' />}
                placement={'right'}
                closable={true}
                mask={false}
                onClose={() => showLayerSelect(false)}
                visible={layerSelectVisible}
            >
                { !hasLayers &&
                <b><Message messageKey='noLayersWithFiles' /></b>
                }
                { bbox && bbox.length &&
                <small onClick={removeBBOX}>{ bbox.join() }</small>
                }
                <ul style={{ 'list-style-type': 'none' }}>
                    { layers.map(layer => (
                        <Layer
                            key={layer.id}
                            layer={layer}
                            service={service} />)) }
                </ul>
            </Drawer>
        </React.Fragment>
    );
};

MainPanel.propTypes = {
    service: PropTypes.object.isRequired,
    bbox: PropTypes.array,
    drawControl: PropTypes.func.isRequired,
    isDrawing: PropTypes.bool
};
